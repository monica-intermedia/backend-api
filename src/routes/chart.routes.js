const express = require("express");
const router = express.Router();
const { getKasKeluar } = require("../controller/chart.data.controller");
const {
  getChartDataPegawai,
  getChartDataSupplier,
  getDataTransaksi,
  getChartDataBarang,
  getPendapatanMingguan,
  getTransaksiHariIni,
} = require("../controller/chart.controller");

router.get("/chart/pembelian", getKasKeluar);
router.get("/chart/pegawai", getChartDataPegawai);
router.get("/chart/supplier", getChartDataSupplier);
router.get("/chart/transaksi", getDataTransaksi);
router.get("/chart/barang", getChartDataBarang);
router.get("/chart/pendapatanmingguan", getPendapatanMingguan);
router.get("/chart/transaksihariini", getTransaksiHariIni);

module.exports = router;
