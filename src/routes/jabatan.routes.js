const express = require("express");
const router = express.Router();
const {
  getJabatan,
  createJabatan,
  editJabatan,
  deleteJabatan,
  getJabatanById,
} = require("../controller/jabatan.controller");

router.get("/pegawai/jabatan", getJabatan);
router.get("/pegawai/jabatan/:jabatanId", getJabatanById);
router.post("/pegawai/jabatan", createJabatan);
router.put("/pegawai/jabatan/:jabatanId", editJabatan);
router.delete("/pegawai/jabatan/:jabatanId", deleteJabatan);

module.exports = router;
