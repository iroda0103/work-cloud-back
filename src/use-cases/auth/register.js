const makeUser = require('../../entities/user')
const { BadRequestError } = require('../../shared/errors')

module.exports = function makeRegister({ usersDb }) {
  return async function register({ username, email, password }) {
    if (await usersDb.findOne({ username })) {
      throw new BadRequestError('Username band')
    }
    if (await usersDb.findOne({ email: email.toLowerCase().trim() })) {
      throw new BadRequestError('Email band')
    }

    const user = makeUser({ username, email, password })
    user.hashPassword()

    const result = await usersDb.insert({
      id:           user.getId(),
      username:     user.getUsername(),
      email:        user.getEmail(),
      password_hash: user.getPasswordHash(),
      role:         user.getRole(),
      is_active:    user.getIsActive(),
      last_login_at: user.getLastLoginAt(),
    })

    const { password_hash: _, ...safeUser } = result
    return safeUser
  }
}
