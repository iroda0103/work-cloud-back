const {
    addOrder,
    listOrder
} = require("../../use-cases/order");

const makePostOrder = require("./postOrder")
const makeGetOrders=require("./getOrders")

const postOrder = makePostOrder({ addOrder });
const getOrders=makeGetOrders({listOrder})

const ordersController = Object.freeze({
    postOrder,
    getOrders
});

module.exports = ordersController;
