const Id = require("../../adapters/Id");
const buildMakeProduct = require("./product");

const makeProduct = buildMakeProduct({Id});

module.exports = makeProduct;
