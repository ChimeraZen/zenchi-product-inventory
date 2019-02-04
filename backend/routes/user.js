// backend/routes/user.js
const express = require('express')
const router = express.Router()

// Controllers
const userController = require('../controllers/user')

// Pagination
router.get('/getUserCount', userController.getUserCount)

// Create
router.put('/addUser', userController.addUser)


// Read
router.get('/getUsers', userController.getUsers)


// Update
router.post('/:id/updateUser', userController.updateUser)


// Delete
router.delete('/:id/deleteUser', userController.deleteUser)


// Login
router.post('/login', userController.login)


module.exports = router