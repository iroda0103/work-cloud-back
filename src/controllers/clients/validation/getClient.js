const Joi = require("joi");

exports.getClientSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};
