const express = require("express");
const router = express.Router();
const { getAdmin, createAdmin } = require("../controller/admin.controller");
const { accessValidation } = require("../middleware/authorization");

router.get("/admin", accessValidation, getAdmin);
router.post("/admin", createAdmin);

module.exports = router;
