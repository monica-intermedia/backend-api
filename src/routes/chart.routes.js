const express = require("express");
const router = express.Router();
const { getKasKeluar } = require("../controller/chart.data.controller");

router.get("/chart/pembelian", getKasKeluar);

module.exports = router;
