const express = require("express");
const router = express.Router();
const {
  getPegawai,
  getPegawaiById,
  editPegawai,
  createPegawai,
  deletePegawai,
} = require("../controller/pegawai.controller");

router.get("/pegawai/pegawai", getPegawai);
router.get("/pegawai/pegawai/:id", getPegawaiById);
router.put("/pegawai/pegawai/:id", editPegawai);
router.post("/pegawai/pegawai", createPegawai);
router.delete("/pegawai/pegawai/:id", deletePegawai);

module.exports = router;
