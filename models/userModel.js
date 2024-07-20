const mongoose = require("mongoose")
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "consumer",
        enum: ["consumer", "admin"]
    }
}, {
    timestamps: true
})

const User = mongoose.model("Users", userSchema)
module.exports = User