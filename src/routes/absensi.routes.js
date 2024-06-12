const express = require("express");
const router = express.Router();
const {
  getAbsensi,
  createAbsensi,
  editAbsensi,
  deleteAbsensi,
  getAbensiById,
} = require("../controller/absensi.controller");

router.get("/pegawai/absensi", getAbsensi);
router.get("/pegawai/absensi/:id", getAbensiById);
router.post("/pegawai/absensi", createAbsensi);
router.put("/pegawai/absensi/:id", editAbsensi);
router.delete("/pegawai/absensi/:id", deleteAbsensi);

module.exports = router;
