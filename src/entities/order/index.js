const Id = require("../../adapters/Id");
const buildMakeOrder = require("./order");

const makeOrder = buildMakeOrder({ Id });

module.exports = makeOrder;
