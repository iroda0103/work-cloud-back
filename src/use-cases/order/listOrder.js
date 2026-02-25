/**
 * @param {object} deps
 * @param {import('../../data-access/orderDb')} deps.orderDb
 */
module.exports = function makeListOrder({ orderDb}) {
    return async function listOrder({
      q,
      page = { limit: 12, offset: 0 },
      sort = { by: "id", order: "desc" }
    }) {

      const { data, total } = await orderDb.findAll({
        q,
        page,
        sort
      });
      const pageInfo = { total, limit: page.limit, offset: page.offset };
      return { data, pageInfo };
    };
  };
  