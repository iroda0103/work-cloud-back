const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/usersDb')} deps.usersDb
 */
module.exports = function makeShowUser({ userDb }) {
  return async function showUser(filter) {
    const userInfo = await userDb.findById(filter);

    if (!userInfo) {
      throw new NotFoundError("Foydalanuvchi topilmadi");
    }

    return { data: userInfo };
  };
};
