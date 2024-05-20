const express = require("express");
const router = express.Router();
const {
  generateDailyExpenseReport,
} = require("../controller/laporan.pengegluaran.controller");

// Route untuk generate laporan pengeluaran harian
router.post("/generate-daily-report", generateDailyExpenseReport);

module.exports = router;
