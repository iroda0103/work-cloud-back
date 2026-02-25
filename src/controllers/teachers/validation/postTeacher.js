const Joi = require("joi");

exports.postTeacherSchema = {
  body: Joi.object({
    first_name: Joi.string().trim(),
    last_name: Joi.string().trim(),
    birthday: Joi.string().trim(),
    email: Joi.string().trim(),
    password: Joi.string().trim(),
    gender:Joi.string().trim(),
    phone:Joi.number(),
    category:Joi.number(),
    info:Joi.string().trim(),
    kun:Joi.string().trim(),
  })
};
