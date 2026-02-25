const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/clientInfoDb')} deps.clientInfoDb
 * @param {import("../../adapters/Upload")} deps.Upload
 */
module.exports = function makeRemoveClient({ clientInfoDb, Upload }) {
  return async function removeClient({ id }) {
    const clientToDelete = await clientInfoDb.findById({ id });

    if (!clientToDelete) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

    await clientInfoDb.remove(clientToDelete);
    await Upload.remove(clientToDelete.photo)
    return clientToDelete;
  };
};
