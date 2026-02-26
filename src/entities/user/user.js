const { InvalidPropertyError } = require('../../shared/errors')

module.exports = function buildMakeUser({ Id, Hash }) {
  return function makeUser({
    id = Id.makeId(),
    username,
    email,
    password,
    password_hash,
    role = 'student',
    is_active = true,
    last_login_at = null,
  } = {}) {
    if (!id) throw new InvalidPropertyError("Foydalanuvchida yaroqli id bo'lishi shart.")

    if (!username || username.trim().length < 3 || username.trim().length > 30) {
      throw new InvalidPropertyError("Username 3-30 belgi orasida bo'lishi shart.")
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new InvalidPropertyError("Yaroqli email manzil kiritilishi shart.")
    }

    if (!password && !password_hash) {
      throw new InvalidPropertyError("Parol kiritilishi shart.")
    }

    if (password && password.length < 8) {
      throw new InvalidPropertyError("Parol kamida 8 belgidan iborat bo'lishi shart.")
    }

    if (!['student', 'teacher', 'admin'].includes(role)) {
      throw new InvalidPropertyError("Role: student | teacher | admin bo'lishi shart.")
    }

    let _password_hash = password_hash || null

    return Object.freeze({
      getId:           () => id,
      getUsername:     () => username.trim(),
      getEmail:        () => email.toLowerCase().trim(),
      getRole:         () => role,
      getIsActive:     () => is_active,
      getLastLoginAt:  () => last_login_at,
      getPasswordHash: () => _password_hash,
      hashPassword() {
        if (password) _password_hash = Hash.generate(password)
      },
      comparePassword(plain) {
        return Hash.compare(plain, _password_hash)
      },
    })
  }
}
