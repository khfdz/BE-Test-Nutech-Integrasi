require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const balanceRoutes = require("./routes/balanceRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use(
  "/api",
  authRoutes,
  userRoutes,
  bannerRoutes,
  serviceRoutes,
  balanceRoutes,
  transactionRoutes
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
