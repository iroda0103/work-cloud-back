const Joi = require("joi");

exports.getProductSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};
