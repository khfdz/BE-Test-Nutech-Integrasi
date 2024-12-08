const User = require("../models/userModel.js");

const getProfile = async (req, res) => {
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
      status: 100,
      message: "Sukses",
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: user.profile_image,
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

const updateProfile = async (req, res) => {
  try {
    const email = req.user.email;

    const { first_name, last_name } = req.body;
    if (!first_name || !last_name) {
      return res.status(400).json({
        status: 101,
        message: "Nama depan dan nama belakang tidak boleh kosong",
        data: null,
      });
    }

    const updateUser = await User.findOneAndUpdate(
      { email },
      { first_name, last_name },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({
        status: 109,
        message: "User tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      status: 0,
      message: "Update Profile berhasil",
      data: {
        email: updateUser.email,
        first_name: updateUser.first_name,
        last_name: updateUser.last_name,
        profile_image: updateUser.profile_image,
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

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 102,
        message: "Format Image tidak sesuai",
        data: null,
      });
    }

    const email = req.user.email;

    const profileImagePath = `https://yoururlapi.com/${req.file.filename}`;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { profile_image: profileImagePath },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: 109,
        message: "User tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      status: 0,
      message: "Upload Profile Image berhasil",
      data: {
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        profile_image: updatedUser.profile_image,
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

module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
};
