const Product = require("../models/productModel")

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({createdAt: -1})
        res.status(200).json({
            message: "Success",
            data: products
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Failed get products"
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.productId})
        res.status(200).json({
            message: "Success",
            data: product
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Failed get product detail"
        })
    }
}

const postProduct = async (req, res) => {
    try {
        await Product.create({...req.body})
        res.status(201).json({
            message: "Success"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Failed post product"
        })
    }
}

const editProduct = async (req, res) => {
    try {
        const isExist = Product.findOne({_id: req.params.productId})
        if(!isExist) {
            throw new Error(`Product with id: ${req.params.productId} is not exist`)
        }
        await Product.updateOne({_id: req.params.productId}, {
            ...req.body
        })
        res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message || "Failed edit product"
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const isExist = Product.findOne({_id: req.params.productId})
        if(!isExist) {
            throw new Error(`Product with id: ${req.params.productId} is not exist`)
        }
        await Product.deleteOne({_id: req.params.productId})
        res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message || "Failed delete product"
        })
    }
}

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    editProduct,
    deleteProduct
}