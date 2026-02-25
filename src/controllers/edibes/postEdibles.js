const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { postProductSchema } = require("../products/validation");

module.exports = function makePostEdibles({ addProduct }) {
    return async function postEdibles(httpRequest) {
        try {
            const validator = httpValidator(
                { body: httpRequest.body },
                postProductSchema
            );
            const { error, body } = await validator.validate();

            if (error) {
                throw new InvalidPropertyError(error);
            }

            const data = await addProduct({ ...body, category: 'edibles', photo: httpRequest?.file?.filename });

            return {
                headers: {
                    "Content-Type": "application/json"
                },
                statusCode: 201,
                body: { data }
            };
        } catch (e) {
            console.log(e);

            return {
                headers: {
                    "Content-Type": "application/json"
                },
                statusCode: mapErrorToStatus(e),
                body: {
                    message: e.message
                }
            };
        }
    };
};
