const makeUser = require("../../entities/user");
const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/usersDb')} deps.userDb
 */
module.exports = function makeEditUser({ userDb }) {
  return async function editUser({ id, ...changes }) {
    const userToEdit = await userDb.findById({ id });

    if (!userToEdit) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }
    const user = makeUser({ ...userToEdit, ...changes });

    user.hashPassword();
    const result = await userDb.update({
      id: user.getId(),
      first_name: user.getFirstName(),
      last_name: user.getLastName(),
      age: user.getAge(),
      role: user.getRole(),
      username: user.getUsername(),
      password: user.getPassword()
    });

    return result;
  };
};
