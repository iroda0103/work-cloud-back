const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/productDb')} deps.productDb
 */
module.exports = function makeShowProduct({ productDb }) {
  return async function showProduct(filter) {
    const productInfo = await productDb.findById({id:filter.id});

    if (!productInfo) {
      throw new NotFoundError("Mahsulot topilmadi");
    }

    return { data: productInfo };
  };
};
