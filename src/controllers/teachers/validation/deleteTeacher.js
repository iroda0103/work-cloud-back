const Joi = require("joi");

exports.deleteTeacherSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};
