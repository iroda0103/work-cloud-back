const Joi = require('joi')

exports.postLoginSchema = {
  body: Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().required(),
  }),
}
