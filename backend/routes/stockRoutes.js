const express = require("express");

const router = express.Router();

const {
  addStock,
  getStocks,
  getStockBySymbol,
  updateStock,
  deleteStock,
} = require("../controllers/stockController");

router.post("/", addStock);

router.get("/", getStocks);

router.get("/:symbol", getStockBySymbol);

router.put("/:id", updateStock);

router.delete("/:id", deleteStock);

module.exports = router;