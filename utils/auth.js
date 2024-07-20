const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (userId, userRole) => {
    return jwt.sign({userInfo: {
        id: userId,
        role: userRole
    }}, "hendratoken", {expiresIn: 60 * 5})
}


module.exports = {
    generateToken
}