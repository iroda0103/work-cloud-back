const makeUser = require("../../entities/user");
const makeVerification = require('../../entities/verification')

/**
 * @param {object} deps
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../data-access/verificationDb')} deps.verificationDb
 */
module.exports = function makeForgotUsers({ userDb, verificationDb, Message }) {
  return async function forgotUser(data) {
    const found = await userDb.findOne({ email: data.email });

    const user = makeUser(found);

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
