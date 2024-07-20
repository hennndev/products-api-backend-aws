const User = require("../models/userModel")

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt: -1})
        res.status(200).json({
            message: "Success",
            data: users
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Failed get users"
        })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.userId})
        if(!user) {
            throw new Error("User not exist")
        }
        res.status(200).json({
            message: "Success",
            data: user
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Failed get user"
        })
    }
}

const editUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.userId})
        if(!user) {
            throw new Error("User not exist")
        }
        await User.updateOne({_id: req.params.userId}, {...req.body})
        res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Failed get user detail"
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.userId})
        if(!user) {
            throw new Error("User not exist")
        }
        await User.deleteOne({_id: req.params.userId})
        res.status(200).json({
            message: "Succces"
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed delete user"
        })
    }
}

module.exports = {
    getUsers,
    getUser,
    editUser,
    deleteUser
}