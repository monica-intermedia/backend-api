const express = require("express");
const router = express.Router();
const {
  getAbsensi,
  createAbsensi,
  editAbsensi,
  deleteAbsensi,
  getAbensiById,
  getAbensiByUser,
} = require("../controller/absensi.controller");
const { authorization } = require("../middleware/authorization");

router.get("/pegawai/absensi", authorization, getAbsensi);
router.get("/pegawai/absensi/:id", authorization, getAbensiById);
router.get("/pegawai/absensiuser/:id", authorization, getAbensiByUser);
router.post("/pegawai/absensi", authorization, createAbsensi);
router.put("/pegawai/absensi/:id", authorization, editAbsensi);
router.delete("/pegawai/absensi/:id", authorization, deleteAbsensi);

module.exports = router;
