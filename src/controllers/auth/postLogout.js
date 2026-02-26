module.exports = function makePostLogout() {
  return async function postLogout() {
    return {
      headers:    { 'Content-Type': 'application/json' },
      statusCode: 200,
      body:       { message: 'Chiqildi' },
    }
  }
}
