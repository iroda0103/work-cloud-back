const Joi = require("joi");
const {
  offsetPaginationSchema,
  buildSortSchema
} = require("../../../shared/schemas");

exports.getClientsSchema = {
  query: Joi.object({
    q: Joi.string().allow(""),
    page: offsetPaginationSchema,
    sort: buildSortSchema(["id"])
  })
};
