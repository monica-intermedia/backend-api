const express = require("express");
const router = express.Router();
const {
  getSupplier,
  createSupplier,
  getCountSupplier,
} = require("../../controller/pelanggan/supplier.controller");

router.get("/pelanggan/supplier", getSupplier);
router.get("/supplier/count", getCountSupplier);
router.post("/pelanggan/supplier", createSupplier);

module.exports = router;
