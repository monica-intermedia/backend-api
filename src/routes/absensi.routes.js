const express = require("express");
const router = express.Router();
const {
  getAbsensi,
  createAbsensi,
  editAbsensi,
  deleteAbsensi,
  getAbensiById,
} = require("../controller/absensi.controller");

router.get("/penjualan/barangkeluar", getAbsensi);
router.get("/penjualan/barangkeluar/:id", getAbensiById);
router.post("/penjualan/barangkeluar", createAbsensi);
router.put("/penjualan/barangkeluar/:id", editAbsensi);
router.delete("/penjualan/barangkeluar/:id", deleteAbsensi);

module.exports = router;
