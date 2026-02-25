const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/productDb')} deps.productDb
 * @param {import("../../adapters/Upload")} deps.Upload
 */
module.exports = function makeRemoveProduct({ productDb, Upload }) {
    return async function removeProduct({ id }) {
        const productToDelete = await productDb.findById({ id });

        if (!productToDelete) {
            throw new NotFoundError("Foydalanuvchi topilmadi.");
        }

        await productDb.remove(productToDelete);
        await Upload.remove(productToDelete.photo)
        
        return productToDelete;
    };
};
