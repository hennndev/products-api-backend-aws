const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/auth")

const register = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(user) {
            throw new Error("Email already used")
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        await User.create({...req.body, password: hashPassword})
        res.status(201).json({
            message: "Success"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed register user"
        })
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) throw new Error("User not exist")
        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if(!checkPassword) throw new Error("Password Incorrect")
        
        const token = generateToken(user._id, user.role)
        res.cookie("token_login", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 5 * 1000
        })
        console.log(req.cookies.token_login)
        res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed login"
        })
    }
}

const logout = async (req, res) => {
    res.clearCookie("token_login", {
        httpOnly: true,
        secure: true,
        sameSite: true
    })
    res.json({
        message: "Success"
    })
}

module.exports = {
    register,
    login,
    logout
}

