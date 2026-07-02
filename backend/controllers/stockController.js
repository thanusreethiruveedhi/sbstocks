const Stock = require("../models/Stock");

// Add Stock
const addStock = async (req, res) => {
  try {
    const stock = await Stock.create(req.body);

    res.status(201).json({
      message: "Stock Added Successfully",
      stock,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Stocks
const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();

    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Stock by Symbol
const getStockBySymbol = async (req, res) => {
  try {
    const stock = await Stock.findOne({
      symbol: req.params.symbol.toUpperCase(),
    });

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Stock
const updateStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    res.status(200).json({
      message: "Stock Updated Successfully",
      stock,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Stock
const deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    res.status(200).json({
      message: "Stock Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addStock,
  getStocks,
  getStockBySymbol,
  updateStock,
  deleteStock,
};