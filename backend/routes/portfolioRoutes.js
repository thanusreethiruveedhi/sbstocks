const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  buyStock,
  sellStock,
  getPortfolio,
  getTransactions,
} = require("../controllers/portfolioController");

// Buy Stock
router.post("/buy", protect, buyStock);

// Sell Stock
router.post("/sell", protect, sellStock);

// Get Portfolio
router.get("/", protect, getPortfolio);

// Get Transactions
router.get("/transactions", protect, getTransactions);

module.exports = router;