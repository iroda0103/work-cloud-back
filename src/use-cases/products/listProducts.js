/**
 * @param {object} deps
 * @param {import('../../data-access/productDb')} deps.productDb
 */
module.exports = function makeListProducts({ productDb }) {
    return async function listProducts({
        filters = {},
        q,
        page = { limit: 10, offset: 0 },
        sort = { by: "id", order: "desc" }
    }) {

        const { data, total } = await productDb.findAll({
            filters,
            q,
            page,
            sort
        });
        const pageInfo = { total, limit: page.limit, offset: page.offset };
        return { data, pageInfo };
    };
};
