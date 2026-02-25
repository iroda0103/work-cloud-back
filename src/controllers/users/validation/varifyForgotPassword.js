const Joi = require('joi')

exports.verifyForgotPasswordSchema = {
    body: Joi.object({
        password: Joi.string().required(),
        email: Joi.string().required(),
        code: Joi.number().integer().required(),
    }),
}
