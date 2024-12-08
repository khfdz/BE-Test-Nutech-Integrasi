const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const {
  registerValidation,
  loginValidation,
} = require("../validations/authValidation");

const registerUser = async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 102,
        message: error.details[0].message,
        data: null,
      });
    }

    const { email, first_name, last_name, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 103,
        message: "Email sudah terdaftar",
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      first_name,
      last_name,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 102,
        message: error.details[0].message,
        data: null,
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: 103,
        message: "Username atau password salah",
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 103,
        message: "Username atau password salah",
        data: null,
      });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: {
        token,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: err.message,
    });
  }
};

module.exports = { registerUser, loginUser };
