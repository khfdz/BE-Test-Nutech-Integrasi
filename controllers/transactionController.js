const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const Service = require("../models/serviceModel");
const {
  topupValidation,
  transactionValidation,
} = require("../validations/authValidation");

const topUpBalance = async (req, res) => {
  try {
    const { value, error } = topupValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: 102,
        message: error.details[0].message,
        data: null,
      });
    }

    const { top_up_amount } = value;

    const email = req.user.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        data: null,
      });
    }

    user.balance += top_up_amount;
    await user.save();

    const transaction = new Transaction({
      user_email: email,
      transaction_type: "TOPUP",
      amount: top_up_amount,
      description: "Top-Up Balance",
    });
    await transaction.save();

    res.status(200).json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: {
        balance: user.balance,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
};

const performTransaction = async (req, res) => {
  try {
    const { value, error } = transactionValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 102,
        message: error.details[0].message,
        data: null,
      });
    }

    const { service_code } = value;

    const email = req.user.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        data: null,
      });
    }

    const service = await Service.findOne({ service_code });
    if (!service) {
      return res.status(404).json({
        status: 102,
        message: "Service atau Layanan tidak ditemukan",
        data: null,
      });
    }

    if (user.balance < service.service_tariff) {
      return res.status(400).json({
        status: 101,
        message: "Saldo tidak cukup",
        data: null,
      });
    }

    user.balance -= service.service_tariff;
    await user.save();

    const invoiceNumber = `INV-${Date.now()}`;

    const transaction = new Transaction({
      user_email: email,
      transaction_type: "PAYMENT",
      amount: service.service_tariff,
      description: `${service.service_name} transaction`,
    });
    await transaction.save();

    res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: {
        invoice_number: invoiceNumber,
        service_code: service.service_code,
        service_name: service.service_name,
        transaction_type: "PAYMENT",
        total_amount: service.service_tariff,
        created_on: new Date(),
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const email = req.user.email;

    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 0;

    const query = { user_email: email };

    const totalRecords = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort({ created_at: -1 })
      .skip(offset)
      .limit(limit || totalRecords);

    const records = transactions.map((transaction) => ({
      invoice_number: transaction._id.toString(),
      transaction_type: transaction.transaction_type,
      description: transaction.description,
      total_amount: transaction.amount,
      created_on: transaction.created_at,
    }));

    res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset,
        limit: limit || totalRecords,
        records,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
};

module.exports = { topUpBalance, performTransaction, getTransactionHistory };
