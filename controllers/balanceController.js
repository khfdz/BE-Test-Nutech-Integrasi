const User = require("../models/userModel.js");

const getBalance = async (req, res) => {
  try {
    const email = req.user.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 109,
        message: "User tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: {
        balance: user.balance,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server error",
      data: null,
    });
  }
};

module.exports = { getBalance };
