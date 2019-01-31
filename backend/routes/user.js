// backend/routes/user.js
const express = require('express')
const router = express.Router()

// Controllers
const userController = require('../controllers/user')


// Create
router.put('/addUser', userController.addUser)


// Read
router.get('/getUsers', userController.getUsers)


// Update
router.post('/updateUsers', userController.updateUsers)


// Delete
router.delete('/deleteUsers', userController.deleteUsers)


// Login
router.post('/login', userController.login)


module.exports = router