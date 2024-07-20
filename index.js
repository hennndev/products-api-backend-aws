const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["*"]
}))
mongoose.set("strictQuery", "false")
mongoose.connect("mongodb+srv://hendra:230897augs@cluster0.03mmlyi.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(5000, process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0', () => console.log("Server and database connected"))
    })
    .catch((err) => {
        console.log(err)
        console.log("Server and database failed connected")
    })

app.use(productRoutes)
app.use(userRoutes)
app.use(authRoutes)