const { mapErrorToStatus } = require('../../shared/errors/handle')

module.exports = function makeGetUsers({ listUsers }) {
  return async function getUsers(httpRequest) {
    try {
      const { page, sort, q } = httpRequest.query
      const result = await listUsers({ page, sort, q })
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
