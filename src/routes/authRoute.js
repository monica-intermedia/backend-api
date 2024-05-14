const express = require("express");
const router = express.Router();
const { login, logout } = require("../controller/authController");

router.post("/auth/login", login);
router.delete("auth/logout", logout);

module.exports = router;
