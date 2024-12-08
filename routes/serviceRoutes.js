const express = require("express");
const { getServices } = require("../controllers/serviceController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/services", verifyToken, getServices);

module.exports = router;
