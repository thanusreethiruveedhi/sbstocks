const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    currentPrice: {
      type: Number,
      required: true,
    },

    sector: {
      type: String,
      default: "Technology",
    },

    marketCap: {
      type: Number,
      default: 0,
    },

    volume: {
      type: Number,
      default: 0,
    },

    changePercent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stock", stockSchema);