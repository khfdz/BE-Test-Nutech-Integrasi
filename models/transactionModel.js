const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  transaction_type: {
    type: String,
    enum: ["TOPUP", "PAYMENT"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
