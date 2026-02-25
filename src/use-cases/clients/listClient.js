/**
 * @param {object} deps
 * @param {import('../../data-access/clientInfoDb')} deps.clientInfoDb
 */
module.exports = function makeListClient({ clientInfoDb }) {
    return async function listClient({
      q,
      page = { limit: 12, offset: 0 },
      sort = { by: "id", order: "desc" }
    }) {

      const { data, total } = await clientInfoDb.findAll({
        q,
        page,
        sort
      });
      const pageInfo = { total, limit: page.limit, offset: page.offset };
      return { data, pageInfo };
    };
  };
  