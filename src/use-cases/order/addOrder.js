const makeOrder = require("../../entities/order");
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/orderDb')} deps.orderDb
 * @param {import('../../data-access/productDb')} deps.productDb
 * @param {import('../../data-access/clientInfoDb')} deps.clientInfoDb
 */
module.exports = function makeAddOrder({ orderDb, clientInfoDb, productDb }) {
    return async function addOrder(data) {

        const order = makeOrder({
            ...data
        });

        const client = await clientInfoDb.findById({ id: order.getUserId() });

        if (!client) {
            throw new BadRequestError(
                "Bunday idlik user mavjud emas"
            );
        }

        const product = await productDb.findById({ id: order.getProductId() });

        if (!product) {
            throw new BadRequestError(
                "Bunday idlik product mavjud emas"
            );
        }
        console.log(product, 'ppp');
        const ordered = await orderDb.findOne({ user_id: order.getUserId(), product_id: order.getProductId() })

        let result;
        if (ordered) {
            order.incrementQuantity()
            result = await orderDb.update({
                id: order.getId(),
                user_id: order.getUserId(),
                product_id: order.getProductId(),
                quantity: order.getQuantity(),
                total_price: product.price * order.getQuantity()
            });
        }
        else {
            result = await orderDb.insert({
                id: order.getId(),
                user_id: order.getUserId(),
                product_id: order.getProductId(),
                quantity: order.getQuantity(),
                total_price: product.price
            });
        }

        return result;
    };
};
