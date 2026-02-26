const Joi = require('joi')

exports.postRegisterSchema = {
  body: Joi.object({
    username: Joi.string().trim().min(3).max(30).required(),
    email:    Joi.string().email().trim().required(),
    password: Joi.string().min(8).required(),
  }),
}
