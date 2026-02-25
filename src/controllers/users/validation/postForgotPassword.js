const Joi = require("joi");

exports.forgotPasswordSchema = {
  body: Joi.object({
    email: Joi.string().trim()
  })
};
