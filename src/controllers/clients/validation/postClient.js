const Joi = require("joi");

exports.postClientSchema = {
  body: Joi.object({
    first_name: Joi.string().trim(),
    last_name: Joi.string().trim(),
    birthday: Joi.string().trim(),
    email: Joi.string().trim(),
    password: Joi.string().trim(),
    phone:Joi.number(),
    teacher_id:Joi.string().trim(),
    service:Joi.number().integer()
  })
};
