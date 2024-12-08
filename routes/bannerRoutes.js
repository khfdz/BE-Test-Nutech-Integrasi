const express = require("express");
const { getBanners } = require("../controllers/bannerController");

const router = express.Router();

router.get("/banner", getBanners);

module.exports = router;
