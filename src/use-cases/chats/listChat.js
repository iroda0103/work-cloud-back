/**
 * @param {object} deps
 * @param {import('../../data-access/chatDb')} deps.chatDb
 */
module.exports = function makeListChat({ chatDb }) {
    return async function listChat({
      q,
      page = { limit: 12, offset: 0 },
      sort = { by: "id", order: "desc" }
    }) {

      const { data, total } = await chatDb.findAll({
        q,
        page,
        sort
      });
      const pageInfo = { total, limit: page.limit, offset: page.offset };
      return { data, pageInfo };
    };
  };
  