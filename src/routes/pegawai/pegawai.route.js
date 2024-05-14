const express = require("express");
const router = express.Router();
const {
  getPegawai,
  getPegawaiById,
  createPegawai,
} = require("../../controller/pegawai/pegawai.controller");

router.get("/pegawai/pegawai", getPegawai);
router.get("/pegawai/pegawai/:pegawaiId", getPegawaiById);
router.post("/pegawai/pegawai", createPegawai);

module.exports = router;
