const Service = require("../models/serviceModel.js");

const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    if (!services.length) {
      return res.status(200).json({
        status: 0,
        message: "Sukses",
        data: [],
      });
    }

    const formattedServices = services.map((service) => ({
      service_code: service.service_code,
      service_name: service.service_name,
      service_icon: service.service_icon,
      service_tariff: service.service_tariff,
    }));

    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: formattedServices,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server error",
      data: null,
    });
  }
};

module.exports = { getServices };
