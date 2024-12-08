const express = require("express");
const { getBalance } = require("../controllers/balanceController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/balance", verifyToken, getBalance);

module.exports = router;
