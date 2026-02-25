const Joi = require("joi");
const {
    offsetPaginationSchema,
    buildSortSchema
} = require("../../../shared/schemas");

exports.getOrdersSchema = {
    query: Joi.object({
        q: Joi.string().trim(),
        page: offsetPaginationSchema,
        sort: buildSortSchema(["id"])
    })
};
