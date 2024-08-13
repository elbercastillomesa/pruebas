const express = require('express')

const { signupUser, loginUser } = require('../controllers/user.controller')

const router = express.Router()

// Login Route
router.post('/login', loginUser)

// Sign Up Route
router.post('/signup', signupUser)

module.exports = router