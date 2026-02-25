const Joi = require("joi");

exports.postProductSchema = {
    body: Joi.object({
        name: Joi.string().trim(),
        brand: Joi.string().trim(),
        type: Joi.string().trim(),
        count: Joi.number().integer(),
        price: Joi.number().integer(),
        info: Joi.string().trim()
    })
};
