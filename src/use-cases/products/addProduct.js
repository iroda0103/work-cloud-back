const makeProduct = require("../../entities/product");

/**
 * @param {object} deps
 * @param {import('../../data-access/productDb')} deps.productDb
 * @param {import('../../adapters/Upload')} deps.Upload
 */
module.exports = function makeAddProduct({ productDb, Upload }) {
    return async function addProduct(data) {
        try {
            const product = makeProduct({
                ...data
            });

            const result = await productDb.insert({
                id: product.getId(),
                name: product.getName(),
                brand: product.getBrand(),
                type: product.getType(),
                info: product.getInfo(),
                photo: product.getPhoto(),
                price: product.getPrice(),
                category: product.getCategory(),
                count: product.getCount()
            });


            return result;
        } catch (e) {
            await Upload.remove(data.photo)
            throw e
        }
    };
};
