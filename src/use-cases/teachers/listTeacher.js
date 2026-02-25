/**
 * @param {object} deps
 * @param {import('../../data-access/teacherInfoDb')} deps.teacherInfoDb
 */
module.exports = function makeListTeachers({ teacherInfoDb }) {
    return async function listTeachers({
      q,
      page = { limit: 12, offset: 0 },
      sort = { by: "id", order: "desc" }
    }) {

      const { data, total } = await teacherInfoDb.findAll({
        q,
        page,
        sort
      });
      const pageInfo = { total, limit: page.limit, offset: page.offset };
      return { data, pageInfo };
    };
  };
  