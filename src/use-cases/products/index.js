const productDb = require("../../data-access/productDb");
const Upload = require("../../adapters/Upload")

const makeAddProduct = require("./addProduct");
const makeListProducts = require("./listProducts")
const makeShowProduct = require("./showProducts")
const makeRemoveProduct = require("./removeProduct")

const addProduct = makeAddProduct({ productDb, Upload });
const listProducts = makeListProducts({ productDb })
const showProduct = makeShowProduct({ productDb })
const removeProduct = makeRemoveProduct({ productDb,Upload})

const productUseCases = Object.freeze({
    addProduct,
    listProducts,
    showProduct,
    removeProduct
});

module.exports = productUseCases;



















