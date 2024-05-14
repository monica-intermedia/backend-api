const express = require("express");
const router = express.Router();
const {
  getPengeluaran,
} = require("../controller/transaksi/pengeluaran.controller");
const {
  getPengeluaranByTipe,
  getAllPengeluranByTipe,
  createTypePengeluaran,
  deleteTypePengeluaran,
} = require("../controller/transaksi/typepenggeluaran.controller");

// pengeluaran
router.get("/transaksi/pengeluaran", getPengeluaran);

// pengeluaran by tipe
router.get("transaksi/pengeluarantype", getAllPengeluranByTipe);
router.get(
  "/transaksi/pengeluaranbytype/:typePengeluaranId",
  getPengeluaranByTipe
);
router.post("/transaksi/typepengeluaran", createTypePengeluaran);
router.delete(
  "/transaksi/deletetypepengeluaran/:typePengeluaranId",
  deleteTypePengeluaran
);

module.exports = router;
