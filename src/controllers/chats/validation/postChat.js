const Joi = require("joi");

exports.postChatSchema = {
  body: Joi.object({
    to: Joi.string().trim(),
    text: Joi.string().trim(),
    from: Joi.string().trim()
  })
};
