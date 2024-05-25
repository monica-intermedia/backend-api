const express = require("express");
const router = express.Router();
const {
  getBarangKeluar,
  getBarangKeluarById,
  createBarangKeluar,
  editBarangKeluar,
  deleteBarangKeluar,
} = require("../controller/barang.keluar.controller");

router.get("/penjualan/barangkeluar", getBarangKeluar);
router.get("/penjualan/barangkeluar/:id", getBarangKeluarById);
router.post("/penjualan/barangkeluar", createBarangKeluar);
router.put("/penjualan/barangkeluar/:id", editBarangKeluar);
router.delete("/penjualan/barangkeluar/:id", deleteBarangKeluar);

module.exports = router;
