const { mapErrorToStatus } = require('../../shared/errors/handle')

module.exports = function makePostStart({ startWorkspace }) {
  return async function postStart(httpRequest) {
    try {
      const result = await startWorkspace({
        workspace_id: httpRequest.params.id,
        user_id:      httpRequest.user.id,
        username:     httpRequest.user.username,
        ip_address:   httpRequest.ip,
        user_agent:   httpRequest.headers['user-agent'],
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
