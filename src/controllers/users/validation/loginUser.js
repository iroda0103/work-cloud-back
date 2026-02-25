const Joi = require("joi");

exports.loginUserSchema = {
  body: Joi.object({
    email: Joi.string().trim(),
    password: Joi.string().trim()
  })
};
