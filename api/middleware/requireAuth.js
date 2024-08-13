const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const requireAuth = async (req, res, next) => {

    // Verify user authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findOne({
            attributes: [
                'id'
            ],
            where: {
                id: id
            }
        })

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'Request is not authorized.' })
    }
}

module.exports = requireAuth;