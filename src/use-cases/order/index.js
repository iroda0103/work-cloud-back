const productDb = require("../../data-access/productDb");
const orderDb = require('../../data-access/orderDb')
const clientInfoDb = require('../../data-access/clientInfoDb')

const makeAddOrder = require("./addOrder");
const makeListOrder=require("./listOrder")

const addOrder = makeAddOrder({ productDb, clientInfoDb, orderDb });
const listOrder=makeListOrder({orderDb})

const orderUseCases = Object.freeze({
    addOrder,
    listOrder
});

module.exports = orderUseCases;



















