const Joi = require("joi");

const registerValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Parameter email tidak sesuai format",
    "string.empty": "Email tidak boleh kosong",
  }),
  first_name: Joi.string().required().messages({
    "string.empty": "Nama depan tidak boleh kosong",
  }),
  last_name: Joi.string().required().messages({
    "string.empty": "Nama belakang tidak boleh kosong",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password minimal 8 karakter",
    "string.empty": "Password tidak boleh kosong",
  }),
  profile_image: Joi.string(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Parameter email tidak sesuai format",
    "string.empty": "Email tidak boleh kosong",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password minimal 8 karakter",
    "string.empty": "Password tidak boleh kosong",
  }),
});

const topupValidation = Joi.object({
  top_up_amount: Joi.number().min(1).required().messages({
    "number.base": "Parameter amount hanya boleh angka",
    "number.empty": "Amount tidak boleh kosong",
    "number.min": "Top up amount harus lebih besar dari 0",
  }),
});

const transactionValidation = Joi.object({
  service_code: Joi.string().required().messages({
    "string.empty": "Service Code tidak boleh kosong",
    "any.required": "Service Code harus diisi",
  }),
});

module.exports = {
  registerValidation,
  loginValidation,
  topupValidation,
  transactionValidation,
};
