const { mapErrorToStatus } = require('../../shared/errors/handle')

module.exports = function makePostStop({ stopWorkspace }) {
  return async function postStop(httpRequest) {
    try {
      const result = await stopWorkspace({
        workspace_id: httpRequest.params.id,
        user_id:      httpRequest.user.id,
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
