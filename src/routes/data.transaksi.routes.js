const express = require("express");
const router = express.Router();
const { authorization } = require("../middleware/authorization");
const {
  getTransaksi,
  getDataTransaksi,
  getTransaksiById,
  createTransaksi,
  createTransaksiAdmin,
  editTransaksi,
  deleteTransaksi,
  getTransaksiByEmail,
  successPayment,
  getTransaksiByStatus,
} = require("../controller/data.transaksi.controller");

router.get("/penjualan/transaksi", getTransaksi);
router.get("/penjualan/datatransaksi", getDataTransaksi);
router.get("/penjualan/transaksistatus", getTransaksiByStatus);
router.get("/penjualan/datatransaksi/email", getTransaksiByEmail);
router.get("/penjualan/transaksi/:id", getTransaksiById);
router.post("/penjualan/transaksi", createTransaksi);
router.post("/penjualan/transaksiAdmin", createTransaksiAdmin);
router.put("/penjualan/transaksi/:id", editTransaksi);
router.delete("/penjualan/transaksi/:id", deleteTransaksi);
router.post("/penjualan/transaksi/success", successPayment);

module.exports = router;
