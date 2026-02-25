const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/clientInfoDb')} deps.clientInfoDb
 */
module.exports = function makeShowClient({ clientInfoDb }) {
  return async function showClient(filter) {
    const clientInfo = await clientInfoDb.findById(filter);

    if (!clientInfo) {
      throw new NotFoundError("Foydalanuvchi topilmadi");
    }

    return { data: clientInfo };
  };
};
