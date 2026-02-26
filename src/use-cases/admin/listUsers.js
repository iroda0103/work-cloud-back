module.exports = function makeListUsers({ usersDb }) {
  return async function listUsers({ page, sort, q } = {}) {
    return usersDb.findAll({ page, sort, q })
  }
}
