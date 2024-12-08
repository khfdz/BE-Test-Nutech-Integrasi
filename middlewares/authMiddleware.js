const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau tidak ada",
        data: null,
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 108,
          message: "Token tidak valid atau kadaluwarsa",
          data: null,
        });
      }

      req.user = payload;
      next();
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: err.message,
    });
  }
};

module.exports = verifyToken;
