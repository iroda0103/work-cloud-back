const { mapErrorToStatus } = require('../../shared/errors/handle')

module.exports = function makeGetWorkspace({ showWorkspace }) {
  return async function getWorkspace(httpRequest) {
    try {
      const workspace = await showWorkspace({
        id:      httpRequest.params.id,
        user_id: httpRequest.user.id,
      })
      return {
        headers:    { 'Content-Type': 'application/json' },
        statusCode: 200,
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
