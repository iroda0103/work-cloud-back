const { removeProduct } = require("../../use-cases/products");

const makeDeleteProduct = require("./deleteProduct");

const deleteProduct = makeDeleteProduct({ removeProduct });

const productsController = Object.freeze({
    deleteProduct,
});

module.exports = productsController;
