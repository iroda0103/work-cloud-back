const Joi = require("joi");

exports.deleteClientSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};
