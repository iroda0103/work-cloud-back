const makeUser = require("../../entities/user");
const makeVerification = require('../../entities/verification')
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../data-access/verificationDb')} deps.verificationDb
 */
module.exports = function makeLoginUser({ userDb, verificationDb, Message }) {
  return async function loginUser(data) {
    const found = await userDb.findOne({ email: data.email });

    const user = makeUser(found);
    const match = user.comparePassword(data.password);

    if (!match) {
      throw new UnauthorizedError(
        "Login (email) yoki parol (password) xato."
      );
    }

    const verification = makeVerification({
      email: data.email
    })

    const code = verification.getCode()

    await verificationDb.insert({
      id: verification.getId(),
      email: verification.getEmail(),
      code
    })
    await Message.send({ email: data.email, code })

    return { msg: `${data.email} pochtaga tasdiqlash kodi yuborildi. Pochtangizni tekshirib ko’ring` };
  };
};
