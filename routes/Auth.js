const express = require("express")
const router = express.Router()
const authcontrol = require("../controllers/Authcontrol")

router.post("/register", authcontrol.register)
router.post("/login", authcontrol.login)
router.patch("/user/:id/reset", authcontrol.resetpassword)

module.exports = router;