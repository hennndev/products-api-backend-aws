const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (userId, userRole) => {
    return jwt.sign({userInfo: {
        id: userId,
        role: userRole
    }}, process.env.TOKEN_SECRET, {expiresIn: 60 * 5})
}


module.exports = {
    generateToken
}