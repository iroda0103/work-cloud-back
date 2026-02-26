const usersDb = require('../../data-access/usersDb')
const Jwt     = require('../../adapters/Jwt')

const makeRegister = require('./register')
const makeLogin    = require('./login')

const register = makeRegister({ usersDb })
const login    = makeLogin({ usersDb, Jwt })

module.exports = Object.freeze({ register, login })
