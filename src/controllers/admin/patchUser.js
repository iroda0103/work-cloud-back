const { mapErrorToStatus } = require('../../shared/errors/handle')

module.exports = function makePatchUser({ editUser }) {
  return async function patchUser(httpRequest) {
    try {
      const { is_active, role } = httpRequest.body
      const user = await editUser({
        id: httpRequest.params.id,
        is_active,
        role,
      })
      return {
        headers:    { 'Content-Type': 'application/json' },
        statusCode: 200,
        body:       { user },
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
