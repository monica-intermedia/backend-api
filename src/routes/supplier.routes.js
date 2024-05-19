const express = require("express");
const router = express.Router();
const {
  getSupplier,
  createSupplier,
  getSupplierById,
  editSupplier,
  deleteSupplier,
} = require("../controller/supplier.controller");

router.get("/pelanggan/supplier", getSupplier);
router.get("/pelanggan/supplier/:id", getSupplierById);
router.put("/pelanggan/supplier/:id", editSupplier);
router.delete("/pelanggan/supplier/:id", deleteSupplier);
router.post("/pelanggan/supplier", createSupplier);

module.exports = router;
