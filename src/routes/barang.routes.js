const express = require("express");
const router = express.Router();
const {
  getBarang,
  getBarangById,
  editBarang,
  createBarang,
  deleteBarang,
} = require("../controller/barang.controleer");

router.get("/barang/barang", getBarang);
router.get("/barang/barang/:id", getBarangById);
router.post("/barang/barang", createBarang);
router.put("/barang/barang/:id", editBarang);
router.delete("/barang/barang/:id", deleteBarang);

module.exports = router;
