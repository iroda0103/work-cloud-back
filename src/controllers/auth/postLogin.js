const { InvalidPropertyError } = require('../../shared/errors')
const { mapErrorToStatus }     = require('../../shared/errors/handle')
const httpValidator            = require('../../shared/validator')
const { postLoginSchema }      = require('./validation')

module.exports = function makePostLogin({ login }) {
  return async function postLogin(httpRequest) {
    try {
      const { error, body } = await httpValidator(
        { body: httpRequest.body },
        postLoginSchema
      ).validate()

      if (error) throw new InvalidPropertyError(error)

      const data = await login(body)

      return {
        headers:    { 'Content-Type': 'application/json' },
        statusCode: 200,
        body:       data,
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
