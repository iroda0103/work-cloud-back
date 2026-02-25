const Joi = require("joi");

exports.postOrderSchema = {
    body: Joi.object({
        user_id: Joi.string().trim(),
        product_id: Joi.string().trim(),
    })
};
