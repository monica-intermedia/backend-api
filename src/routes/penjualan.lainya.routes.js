const express = require("express");
const router = express.Router();
const {
  getAllOtherSell,
  getAllOtherSellById,
  createOtherSellData,
  updateOtherSellData,
  deleteOtherSellData,
} = require("../controller/penjualan.lainya.controller");

router.get("/kasmasuk/penjualanlainya", getAllOtherSell);
router.get("/kasmasuk/penjualanlainya/:id", getAllOtherSellById);
router.put("/kasmasuk/penjualanlainya/:id", updateOtherSellData);
router.post("/kasmasuk/penjualanlainya", createOtherSellData);
router.delete("/kasmasuk/penjualanlainya/:id", deleteOtherSellData);

module.exports = router;
