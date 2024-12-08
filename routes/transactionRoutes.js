const express = require("express");
const {
  topUpBalance,
  performTransaction,
  getTransactionHistory,
} = require("../controllers/transactionController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/topup", verifyToken, topUpBalance);

router.post("/transaction", verifyToken, performTransaction);

router.get("/transaction/history", verifyToken, getTransactionHistory);

module.exports = router;
