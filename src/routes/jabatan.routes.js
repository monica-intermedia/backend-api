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
router.get("/pegawai/jabatan/:id", getJabatanById);
router.post("/pegawai/jabatan", createJabatan);
router.put("/pegawai/jabatan/:id", editJabatan);
router.delete("/pegawai/jabatan/:id", deleteJabatan);

module.exports = router;
