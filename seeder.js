const connectDB = require("./config/db");
const Banner = require("./models/bannerModel");
const Service = require("./models/serviceModel");

const banners = [
  {
    banner_name: "Banner 1",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lorem Ipsum Dolor sit amet",
  },
  {
    banner_name: "Banner 2",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lorem Ipsum Dolor sit amet",
  },
  {
    banner_name: "Banner 3",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lorem Ipsum Dolor sit amet",
  },
  {
    banner_name: "Banner 4",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lorem Ipsum Dolor sit amet",
  },
  {
    banner_name: "Banner 5",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lorem Ipsum Dolor sit amet",
  },
  {
    banner_name: "Banner 6",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lorem Ipsum Dolor sit amet",
  },
];

const services = [
  {
    service_code: "PAJAK",
    service_name: "Pajak PBB",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 40000,
  },
  {
    service_code: "PLN",
    service_name: "Listrik",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 10000,
  },
  {
    service_code: "PDAM",
    service_name: "PDAM Berlangganan",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 40000,
  },
  {
    service_code: "PULSA",
    service_name: "Pulsa",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 40000,
  },
  {
    service_code: "PGN",
    service_name: "PGN Berlangganan",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 50000,
  },
  {
    service_code: "MUSIK",
    service_name: "Musik Berlangganan",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 50000,
  },
  {
    service_code: "TV",
    service_name: "TV Berlangganan",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 50000,
  },
  {
    service_code: "PAKET_DATA",
    service_name: "Paket data",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 50000,
  },
  {
    service_code: "VOUCHER_GAME",
    service_name: "Voucher Game",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 100000,
  },
  {
    service_code: "VOUCHER_MAKANAN",
    service_name: "Voucher Makanan",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 100000,
  },
  {
    service_code: "QURBAN",
    service_name: "Qurban",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 200000,
  },
  {
    service_code: "ZAKAT",
    service_name: "Zakat",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 300000,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Banner.deleteMany({});
    console.log("Old banners deleted");
    await Service.deleteMany({});
    console.log("Old services deleted");

    await Banner.insertMany(banners);
    console.log("Data banners seeded successfully");
    await Service.insertMany(services);
    console.log("Data services seeded successfully");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err.message);
    process.exit(1);
  }
};

seedData();
