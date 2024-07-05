const express = require("express");
const router = express.Router();
const {
  getTransaksi,
  getDataTransaksi,
  getTransaksiById,
  createTransaksi,
  editTransaksi,
  deleteTransaksi,
  getTransaksiByEmail,
  notification,
} = require("../controller/data.transaksi.controller");

router.get("/penjualan/transaksi", getTransaksi);
router.get("/penjualan/datatransaksi", getDataTransaksi);
router.get("/penjualan/datatransaksi/email", getTransaksiByEmail);
router.get("/penjualan/transaksi/:id", getTransaksiById);
router.post("/penjualan/transaksi", createTransaksi);
router.post("/penjualan/transaksi/notification", notification);
router.put("/penjualan/transaksi/:id", editTransaksi);
router.delete("/penjualan/transaksi/:id", deleteTransaksi);

module.exports = router;
