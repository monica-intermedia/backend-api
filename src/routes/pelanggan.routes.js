const express = require("express");
const router = express.Router();
const {
  getPelanggan,
  createPelanggan,
  getPelangganById,
  editPelanggan,
  deletePelanggan,
} = require("../controller/pelanggan.controller");

router.get("/pelanggan/pelanggan", getPelanggan);
router.get("/pelanggan/pelanggan/:id", getPelangganById);
router.put("/pelanggan/pelanggan/:id", editPelanggan);
router.post("/pelanggan/pelanggan", createPelanggan);
router.delete("/pelanggan/pelanggan/:id", deletePelanggan);

module.exports = router;
