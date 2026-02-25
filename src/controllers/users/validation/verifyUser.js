const Joi = require('joi')

exports.verifyUserSchema = {
    body: Joi.object({
        email: Joi.string().required(),
        code: Joi.number().integer().required()
    }),
}
