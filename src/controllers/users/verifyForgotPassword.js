const { InvalidPropertyError } = require('../../shared/errors')
const { mapErrorToStatus } = require('../../shared/errors/handle')
const httpValidator = require('../../shared/validator')
const { verifyForgotPasswordSchema } = require('./validation')

module.exports = function makeVerifyForgotPassword({ verifyForgotPassword}) {
    return async function (httpRequest) {
        try {
            const validator = httpValidator(
                { body: httpRequest.body },
                verifyForgotPasswordSchema
            )
            const { error, body } = await validator.validate()

            if (error) {
                throw new InvalidPropertyError(error)
            }

            const data = await verifyForgotPassword({ ...body })

            return {
                header: { 'Content-Type': 'application/json' },
                statusCode: 200,
                body:data,
            }
        } catch (e) {
            console.log(e)
            return {
                header: { 'Content-Type': 'application/json' },
                statusCode: mapErrorToStatus(e),
                body: { message: e.message },
            }
        }
    }
}
