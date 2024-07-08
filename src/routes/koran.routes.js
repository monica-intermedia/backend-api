const express = require("express");
const router = express.Router();
const {
  getTipeKoran,
  createTipeKoran,
  editTipeKoran,
  getTipeKoranById,
  deleteTipeKoran,
} = require("../controller/koran.controller");

router.get("/koran", getTipeKoran);
router.post("/koran", createTipeKoran);
router.put("/koran/:id", editTipeKoran);
router.get("/koran/:id", getTipeKoranById);
router.delete("/koran/:id", deleteTipeKoran);

module.exports = router;
