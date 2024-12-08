const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    banner_name: {
      type: String,
      required: true,
    },
    banner_image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
