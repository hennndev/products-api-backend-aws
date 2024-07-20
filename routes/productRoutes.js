const express = require("express")
const verifyAdmin = require("../middlewares/verifyAdmin")
const { getProducts, getProduct, postProduct, editProduct, deleteProduct } = require("../controllers/productControllers")
const router = express.Router()

router.get("/api/v1/products", async (req, res) => await getProducts(req, res))
router.get("/api/v1/products/:productId", async (req, res) => await getProduct(req, res))
router.post("/api/v1/products", verifyAdmin, async (req, res) => await postProduct(req, res))
router.put("/api/v1/products/:productId", verifyAdmin, async (req, res) => await editProduct(req, res))
router.delete("/api/v1/products/:productId", verifyAdmin, async (req, res) => await deleteProduct(req, res))

module.exports = router