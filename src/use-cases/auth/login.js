const makeUser = require('../../entities/user')
const { UnauthorizedError, ForbiddenError } = require('../../shared/errors')

module.exports = function makeLogin({ usersDb, Jwt }) {
  return async function login({ username, password }) {
    const found = await usersDb.findOne({ username })

    if (!found) {
      throw new UnauthorizedError("Login yoki parol noto'g'ri")
    }

    const user = makeUser({ ...found, password })

    const match = user.comparePassword(password)
    if (!match) {
      throw new UnauthorizedError("Login yoki parol noto'g'ri")
    }

    if (!found.is_active) {
      throw new ForbiddenError('Hisob bloklangan')
    }

    await usersDb.update({ id: found.id, last_login_at: new Date() })

    const token = Jwt.generateToken({
      user: { id: found.id, username: found.username, role: found.role },
    })

    return {
      token,
      user: { _id: found.id, username: found.username, role: found.role },
    }
  }
}
