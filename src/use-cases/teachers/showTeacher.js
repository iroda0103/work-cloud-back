const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/teacherInfoDb')} deps.teacherInfoDb
 */
module.exports = function makeShowTeacher({ teacherInfoDb }) {
  return async function showTeacher(filter) {
    const teacherInfo = await teacherInfoDb.findById(filter);

    if (!teacherInfo) {
      throw new NotFoundError("Foydalanuvchi topilmadi");
    }

    return { data: teacherInfo };
  };
};
