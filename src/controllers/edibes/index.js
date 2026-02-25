const { addProduct,listProducts,showProduct } = require("../../use-cases/products");

const makePostEdibles = require("./postEdibles");
const makeGetEdibles=require("./getEdibles")
const makeGetEdible=require("./getEdible")


const postEdibles = makePostEdibles({ addProduct });
const getEdibles=makeGetEdibles({listProducts})
const getEdible=makeGetEdible({showProduct})

const productsController = Object.freeze({
    postEdibles,
    getEdibles,
    getEdible
});

module.exports = productsController;
