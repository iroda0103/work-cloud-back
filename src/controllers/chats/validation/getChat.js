const Joi = require("joi");

exports.getChatSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};
