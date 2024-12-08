const Banner = require("../models/bannerModel.js");

const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();

    if (!banners.length) {
      return res.status(200).json({
        status: 0,
        message: "Sukses",
        data: [],
      });
    }

    const formattedBanners = banners.map((banner) => ({
      banner_name: banner.banner_name,
      banner_image: banner.banner_image,
      description: banner.description,
    }));

    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: formattedBanners,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server error",
      data: null,
    });
  }
};

module.exports = { getBanners };
