const Joi = require("joi");
const {
    offsetPaginationSchema,
    buildSortSchema
} = require("../../../shared/schemas");

exports.getProductsSchema = {
    query: Joi.object({
        q: Joi.string().allow(""),
        filters: { category: Joi.string().valid("device", "edibles") },
        page: offsetPaginationSchema,
        sort: buildSortSchema(["id"])
    })
};
