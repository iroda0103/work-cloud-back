const { mapErrorToStatus } = require('../../shared/errors/handle')

module.exports = function makeDeleteWorkspace({ removeWorkspace }) {
  return async function deleteWorkspace(httpRequest) {
    try {
      const result = await removeWorkspace({
        id:      httpRequest.params.id,
        user_id: httpRequest.user.id,
      })
      return {
        headers:    { 'Content-Type': 'application/json' },
        statusCode: 200,
        body:       result,
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
