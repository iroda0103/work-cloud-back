const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getOrderSchema } = require("./validation");

module.exports = function makeGetOrders({ listOrder }) {
    return async function getOrders(httpRequest) {
        try {
            console.log(httpRequest);
            // const validator = httpValidator(
            //     { query: httpRequest.query },
            //     getOrderSchema
            // );
            // console.log(query);
            // const { error, query } = await validator.validate();

            // if (error) {
            //     throw new InvalidPropertyError(error);
            // }
            const result = await listOrder({ query:httpRequest.query });
            // const result = 'pp'
            return {
                headers: {
                    "Content-Type": "application/json"
                },
                statusCode: 200,
                body: { ...result }
            };
        } catch (e) {
            console.log(e);

            return {
                headers: {
                    "Content-Type": "application/json"
                },
                statusCode: mapErrorToStatus(e),
                body: { message: e.message }
            };
        }
    };
};
