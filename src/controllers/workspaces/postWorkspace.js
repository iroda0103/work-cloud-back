const { InvalidPropertyError } = require('../../shared/errors')
const { mapErrorToStatus }     = require('../../shared/errors/handle')
const httpValidator            = require('../../shared/validator')
const { postWorkspaceSchema }  = require('./validation')

module.exports = function makePostWorkspace({ createWorkspace }) {
  return async function postWorkspace(httpRequest) {
    try {
      const { error, body } = await httpValidator(
        { body: httpRequest.body },
        postWorkspaceSchema
      ).validate()

      if (error) throw new InvalidPropertyError(error)

      const workspace = await createWorkspace({
        user_id: httpRequest.user.id,
        ...body,
      })

      return {
        headers:    { 'Content-Type': 'application/json' },
        statusCode: 201,
        body:       { workspace },
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
