const { mapErrorToStatus } = require('../../shared/errors/handle')

module.exports = function makeGetSessions({ listSessions }) {
  return async function getSessions(httpRequest) {
    try {
      const result = await listSessions({
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
