const express = require("express");
const router = express.Router();
const {
  getPembelian,
  getPembelianById,
  editPembelian,
  createPembelian,
  deletePembelian,
} = require("../controller/pembelian.barang.controller");

router.get("/kaskeluar/pembelianbarang", getPembelian);
router.get("/kaskeluar/pembelianbarang/:id", getPembelianById);
router.put("/kaskeluar/pembelianbarang/:id", editPembelian);
router.post("/kaskeluar/pembelianbarang", createPembelian);
router.delete("/kaskeluar/pembelianbarang/:id", deletePembelian);

module.exports = router;
