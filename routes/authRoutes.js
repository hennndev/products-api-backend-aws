const express = require("express")
const verifyJwt = require("../middlewares/verifyJwt")
const { register, login, logout } = require("../controllers/authController")
const router = express.Router()

router.post("/api/v1/auth/login", async (req, res) => await login(req, res))
router.post("/api/v1/auth/register", async (req, res) => await register(req, res))
router.get("/api/v1/auth/logout", verifyJwt, async (req, res) => await logout(req, res))

module.exports = router