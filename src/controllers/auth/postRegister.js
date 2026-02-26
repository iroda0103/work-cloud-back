const { InvalidPropertyError } = require('../../shared/errors')
const { mapErrorToStatus }     = require('../../shared/errors/handle')
const httpValidator            = require('../../shared/validator')
const { postRegisterSchema }   = require('./validation')

module.exports = function makePostRegister({ register }) {
  return async function postRegister(httpRequest) {
    try {
      const { error, body } = await httpValidator(
        { body: httpRequest.body },
        postRegisterSchema
      ).validate()

      if (error) throw new InvalidPropertyError(error)

      const user = await register(body)

      return {
        headers:    { 'Content-Type': 'application/json' },
        statusCode: 201,
        body:       { message: "Muvaffaqiyatli ro'yxatdan o'tildi", user },
      }
    } catch (e) {
      console.error(e)
      return {
        headers:    { 'Content-Type': 'application/json' },
        statusCode: mapErrorToStatus(e),
        body:       { error: e.message },
      }
    }
  }
}
