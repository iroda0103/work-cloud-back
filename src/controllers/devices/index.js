const { addProduct, listProducts, showProduct } = require("../../use-cases/products");

const makePostProduct = require("./postDevices");
const makeGetDevices = require("./getDevices")
const makeGetDevice = require("./getDevice")

const postProduct = makePostProduct({ addProduct });
const getDevices = makeGetDevices({ listProducts })
const getDevice = makeGetDevice({ showProduct })

const productsController = Object.freeze({
    postProduct,
    getDevices,
    getDevice
});

module.exports = productsController;
