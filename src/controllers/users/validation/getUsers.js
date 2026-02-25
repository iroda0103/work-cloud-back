const Joi = require("joi");
const {
  offsetPaginationSchema,
  buildSortSchema
} = require("../../../shared/schemas");

exports.getUsersSchema = {
  query: Joi.object({
    q: Joi.string().allow(""),
    filters: { role: Joi.string().valid("teacher", "admin", "client") },
    page: offsetPaginationSchema,
    sort: buildSortSchema(["id", "age"])
  })
};
