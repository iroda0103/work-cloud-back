const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/usersDb')} deps.usersDb
 */
module.exports = function makeRemoveUser({ userDb }) {
  return async function removeUser({ id }) {
    const userToDelete = await userDb.findById({ id });

    if (!userToDelete) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

    await userDb.remove(userToDelete);

    return userToDelete;
  };
};
