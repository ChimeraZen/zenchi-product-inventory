// backend/controllers/user.js
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validateAddUserInput = require('../validation/user')
const validateLoginInput = require('../validation/login')

// Models
const User = require('../models/User')

// Pagination
module.exports.getUserCount = async (req, res) => {
  try {
    const users = await User.find()
    const userCount = users.length
    return res.status(200).json(userCount)
  } catch(err) {
    console.error(`There was an error getting user count: ${err}`)
    return res.status(400)
  }
}

// Create
module.exports.addUser = async (req, res) => {
  try {
    const user = req.body
    const { errors, isValid } = validateAddUserInput(user)

    // Validation
    if(!isValid) {
      return res.status(400).json(errors)
    }
  
    // Unique entry check
    const userExists = await User.findOne({
      email: user.email
    })
    if(userExists) {
      return res.status(400).json({
        email: 'Email already exists'
      })
    } 
    
    
    // Create user
    const newUser = new User({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role
    })
    
    // Bcrypt salt & hash password
    const salt = await bcrypt.genSalt(10)
    const hash = salt && await bcrypt.hash(newUser.password, salt)
    
    newUser.password = hash
    newUser.save()
    
    return res.status(200)
  } catch(err) {
    console.log(`User creation error: ${err}`)
    res.status(400)
  }
}


// Read
module.exports.getUsers = async (req, res) => {
  try {
    const perPage = parseInt(req.query.perPage) || 10
    const activePage = parseInt(req.query.activePage) || 5
    const { sortBy, direction } = req.query
    const skip = perPage === 0 ? perPage : perPage * (activePage - 1)
    
    const users = await User.find()
                            .skip(skip)
                            .limit(perPage)
                            .sort({ [sortBy]: direction })
    
    return res.status(200).json( users )
  } catch (err) {
    console.error(`There was an error getting users: ${err}`)
    return res.status(400)
  }
}


// Update
module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = req.body
    
    await User.findByIdAndUpdate({ _id: id }, user)
    
    return res.status(200).json({msg: 'User updated successfully'})
  } catch (err) {
    console.error(`There was an error updating users: ${err}`)
    return res.status(400)
  }
}


// Delete
module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    
    await User.findByIdAndDelete({ _id: id })
    return res.status(200).json({msg: 'User deleted successfully'})
  } catch (err) {
    console.error(`There was an error deleting users: ${err}`)
    return res.status(400)
  }
}


// Login
module.exports.login = async (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body)

    if(!isValid) {
      return res.status(400).json(errors)
    }
    
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({email})

    if(!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch) {
      const payload = {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      }
      
      const token = await jwt.sign(payload, 'secret', {
        expiresIn: 3600
      })
      
      if(token) {
        return res.status(200).json({
          success: true,
          token: `Bearer ${token}`
        })
      }
    } else {
      errors.password = 'Incorrect Password'
      return res.status(400).json(errors)
    }
  } catch (err) {
    console.error(`There was an error logging in: ${err}`)
    return res.status(400)
  }
}