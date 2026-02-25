const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { forgotPasswordSchema } = require("./validation");

module.exports = function makeForgotUser({ forgotUser }) {
    return async function postForgotPassword(httpRequest) {
        try {
            const validator = httpValidator(
                { body: httpRequest.body },
                forgotPasswordSchema
            );
            const { error, body } = await validator.validate();

            if (error) {
                throw new InvalidPropertyError(error);
            }
            
            let data = await forgotUser({ ...body });
            return {
                headers: {
                    "Content-Type": "application/json"
                },
                statusCode: 200,
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
