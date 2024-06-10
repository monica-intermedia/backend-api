const express = require("express");
const router = express.Router();
const {
  getAllOtherBuy,
  getAllOtherBuyById,
  createOtherBuyData,
  updateOtherBuyData,
  deleteOtherBuyData,
} = require("../controller/pembelian.lainya.controller");

router.get("/kaskeluar/pembelianlainya", getAllOtherBuy);
router.get("/kaskeluar/pembelianlainya/:id", getAllOtherBuyById);
router.put("/kaskeluar/pembelianlainya/:id", updateOtherBuyData);
router.post("/kaskeluar/pembelianlainya", createOtherBuyData);
router.delete("/kaskeluar/pembelianlainya/:id", deleteOtherBuyData);

module.exports = router;
