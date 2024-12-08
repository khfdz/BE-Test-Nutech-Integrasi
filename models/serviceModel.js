const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    service_code: {
      type: String,
      required: true,
      unique: true,
    },
    service_name: {
      type: String,
      required: true,
    },
    service_icon: {
      type: String,
      required: true,
    },
    service_tariff: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
