const Joi = require("joi");

exports.getTeacherSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};
