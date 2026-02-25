const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getProductSchema } = require("../products/validation");

module.exports = function makeGetDevice({ showProduct }) {
    return async function getDevice(httpRequest) {
        try {
            const validator = httpValidator(
                { params: httpRequest.params },
                getProductSchema
            );
            const { error, params } = await validator.validate();

            if (error) {
                throw new InvalidPropertyError(error);
            }

            const result = await showProduct({ ...params, category: "device" });

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
