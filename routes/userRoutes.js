const express = require("express")
const verifyJwt = require("../middlewares/verifyJwt")
const verifyAdmin = require("../middlewares/verifyAdmin")
const { getUser, getUsers, editUser, deleteUser } = require("../controllers/userControllers")
const router = express.Router()

router.get("/api/v1/users", verifyAdmin, async (req, res) => await getUsers(req, res))
router.get("/api/v1/users/:userId", verifyJwt, async (req, res) => await getUser(req, res))
router.put("/api/v1/users/:userId", verifyJwt, async (req, res) => await editUser(req, res))
router.delete("/api/v1/users/:userId", verifyAdmin, async (req, res) => await deleteUser(req, res))

module.exports = router