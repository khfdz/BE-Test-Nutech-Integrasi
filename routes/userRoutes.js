const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const {
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

router.put("/profile/image", verifyToken, uploadMiddleware, uploadProfileImage);

module.exports = router;
