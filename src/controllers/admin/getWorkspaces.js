const { mapErrorToStatus } = require('../../shared/errors/handle')

module.exports = function makeGetAllWorkspaces({ listAllWorkspaces }) {
  return async function getAllWorkspaces(httpRequest) {
    try {
      const { page, sort } = httpRequest.query
      const result = await listAllWorkspaces({ page, sort })
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
