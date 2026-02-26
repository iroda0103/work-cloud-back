const { NotFoundError } = require('../../shared/errors')

module.exports = function makeEditUser({ usersDb }) {
  return async function editUser({ id, is_active, role }) {
    const found = await usersDb.findById({ id })
    if (!found) throw new NotFoundError('Foydalanuvchi topilmadi')

    const updates = {}
    if (is_active !== undefined) updates.is_active = is_active
    if (role      !== undefined) updates.role       = role

    return usersDb.update({ id, ...updates })
  }
}
