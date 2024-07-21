const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  loginKaryawan,
} = require("../controller/auth.controller");
const { authorization } = require("../middleware/authorization");

router.post("/auth/login", login);
router.delete("/auth/logout", logout);
router.post("/auth/loginkaryawan", loginKaryawan);

module.exports = router;
