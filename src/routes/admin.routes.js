const express = require("express");
const router = express.Router();
const { getAdmin, createAdmin } = require("../controller/admin.controller");
const { accessValidation } = require("../middleware/authorization");

// Tambahkan middleware accessValidation jika diperlukan
// router.use(accessValidation);

router.get("/admin/admin", getAdmin);
router.post("/admin/admin", createAdmin);

module.exports = router;
