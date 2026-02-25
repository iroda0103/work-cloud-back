const makeUser = require("../../entities/user");
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../adapters/Upload')} deps.Upload
 */
module.exports = function makeAddUser({ userDb, Upload }) {
  return async function addUser(data) {
    try {
      const user = makeUser({
        ...data
      });

      const userInfo = await userDb.findOne({ email: user.getEmail() });

      if (userInfo) {
        throw new BadRequestError(
          "Bunday nomli Email mavjud boshqa email tanlang"
        );
      }

      const userInfoPhone = await userDb.findOne({ phone: user.getPhoneNumber() });

      if (userInfoPhone) {
        throw new BadRequestError(
          "Bunday nomli telefon nomer mavjud boshqa nomer tanlang"
        );
      }

      user.hashPassword();
      const result = await userDb.insert({
        id: user.getId(),
        first_name: user.getFirstName(),
        last_name: user.getLastName(),
        birthday: user.getBirthDate(),
        role: user.getRole(),
        email: user.getEmail(),
        phone: user.getPhoneNumber(),
        password: user.getPassword(),
        photo: user.getPhoto()
      });


      return result;
    } catch (e) {
      await Upload.remove(data.photo)
      throw e
    }
  };
};
