const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getChatSchema } = require("./validation");

module.exports = function makeGetChat({ showChat }) {
    return async function getChat(httpRequest) {
        try {
            const validator = httpValidator(
                { params: httpRequest.params },
                getChatSchema
            );
            const { error, params } = await validator.validate();

            if (error) {
                throw new InvalidPropertyError(error);
            }
            
            const result = await showChat({ ...params, user: httpRequest.user });

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
