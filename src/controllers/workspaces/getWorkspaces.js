const { mapErrorToStatus } = require('../../shared/errors/handle')

module.exports = function makeGetWorkspaces({ listWorkspaces }) {
  return async function getWorkspaces(httpRequest) {
    try {
      const workspaces = await listWorkspaces({ user_id: httpRequest.user.id })
      return {
        headers:    { 'Content-Type': 'application/json' },
        statusCode: 200,
        body:       { workspaces },
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
