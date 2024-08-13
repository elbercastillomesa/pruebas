const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

// Login User

const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user.id)

        res.status(200).json({ email, token })
        
    } catch (error) {
        res.status(400).json({ error: error.message })        
    }
}

// Sign Up User

const signupUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)
        const token = createToken(user.id)

        res.status(200).json({ email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { signupUser, loginUser }