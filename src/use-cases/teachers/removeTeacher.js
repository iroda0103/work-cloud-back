const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/teacherInfoDb')} deps.teacherInfoDb
 * @param {import("../../adapters/Upload")} deps.Upload
 */
module.exports = function makeRemoveTeacher({ teacherInfoDb, Upload }) {
  return async function removeTeacher({ id }) {
    const teacherToDelete = await teacherInfoDb.findById({ id });

    if (!teacherToDelete) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

    await teacherInfoDb.remove(teacherToDelete);
    await Upload.remove(teacherToDelete.photo)
    return teacherToDelete;
  };
};
