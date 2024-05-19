const express = require("express");
const router = express.Router();
const {
  getPelanggan,
  createPelanggan,
} = require("../controller/pelanggan.controller");

router.get("/pegawai/pegawai", getPegawai);
router.get("/pegawai/pegawai/:pegawaiId", getPegawaiById);
router.put("/pegawai/pegawai/:pegawaiId", editPegawai);
router.post("/pegawai/pegawai", createPegawai);
router.delete("/pegawai/pegawai/:pegawaiId", deletePegawai);

module.exports = router;
