const Portfolio = require("../models/Portfolio");
const Transaction = require("../models/Transaction");
const Stock = require("../models/Stock");
const User = require("../models/User");

// ================= BUY STOCK =================
const buyStock = async (req, res) => {
  try {
    const userId = req.user.id;
    const { stockId, quantity } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const stock = await Stock.findById(stockId);
    if (!stock)
      return res.status(404).json({ message: "Stock not found" });

    const totalCost = stock.currentPrice * quantity;

    if (user.balance < totalCost) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    user.balance -= totalCost;
    await user.save();

    let portfolio = await Portfolio.findOne({
      user: userId,
      stock: stockId,
    });

    if (portfolio) {
      const oldValue =
        portfolio.averageBuyPrice * portfolio.quantity;

      const newValue = stock.currentPrice * quantity;

      portfolio.quantity += quantity;

      portfolio.averageBuyPrice =
        (oldValue + newValue) / portfolio.quantity;

      portfolio.totalInvestment += totalCost;

      await portfolio.save();
    } else {
      portfolio = await Portfolio.create({
        user: userId,
        stock: stockId,
        quantity,
        averageBuyPrice: stock.currentPrice,
        totalInvestment: totalCost,
      });
    }

    await Transaction.create({
      user: userId,
      stock: stockId,
      type: "BUY",
      quantity,
      price: stock.currentPrice,
      totalAmount: totalCost,
    });

    res.status(200).json({
      message: "Stock Purchased Successfully",
      remainingBalance: user.balance,
      portfolio,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= SELL STOCK =================
const sellStock = async (req, res) => {
  try {
    const userId = req.user.id;
    const { stockId, quantity } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const stock = await Stock.findById(stockId);
    if (!stock)
      return res.status(404).json({ message: "Stock not found" });

    const portfolio = await Portfolio.findOne({
      user: userId,
      stock: stockId,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Stock not found in portfolio",
      });
    }

    if (portfolio.quantity < quantity) {
      return res.status(400).json({
        message: "Not enough shares to sell",
      });
    }

    const totalAmount = stock.currentPrice * quantity;

    user.balance += totalAmount;
    await user.save();

    portfolio.quantity -= quantity;

    if (portfolio.quantity === 0) {
      await Portfolio.findByIdAndDelete(portfolio._id);
    } else {
      await portfolio.save();
    }

    await Transaction.create({
      user: userId,
      stock: stockId,
      type: "SELL",
      quantity,
      price: stock.currentPrice,
      totalAmount,
    });

    res.status(200).json({
      message: "Stock Sold Successfully",
      remainingBalance: user.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= PORTFOLIO =================
const getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;

    const portfolio = await Portfolio.find({
      user: userId,
    }).populate("stock");

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= TRANSACTIONS =================
const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({
      user: userId,
    }).populate("stock");

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  buyStock,
  sellStock,
  getPortfolio,
  getTransactions,
};