const Joi = require("joi");

exports.deleteProductSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};
