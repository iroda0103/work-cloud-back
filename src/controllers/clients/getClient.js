const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getClientSchema } = require("./validation");

module.exports = function makeGetClient({ showClient }) {
    return async function getClient(httpRequest) {
        try {
            const validator = httpValidator(
                { params: httpRequest.params },
                getClientSchema
            );
            const { error, params } = await validator.validate();

            if (error) {
                throw new InvalidPropertyError(error);
            }

            const result = await showClient({ ...params });

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
