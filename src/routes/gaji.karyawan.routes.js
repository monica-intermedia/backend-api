const express = require("express");
const router = express.Router();
const {
  getGaji,
  getGajiById,
  createGaji,
  editGaji,
  deleteGaji,
} = require("../controller/gaji.karyawan.controller");

router.get("/pegawai/gaji", getGaji);
router.get("/pegawai/gaji/:id", getGajiById);
router.post("/pegawai/gaji", createGaji);
router.put("/pegawai/gaji/:id", editGaji);
router.delete("/pegawai/gaji/:id", deleteGaji);

module.exports = router;
