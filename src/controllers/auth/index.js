const { register, login } = require('../../use-cases/auth')

const makePostRegister = require('./postRegister')
const makePostLogin    = require('./postLogin')
const makePostLogout   = require('./postLogout')

const postRegister = makePostRegister({ register })
const postLogin    = makePostLogin({ login })
const postLogout   = makePostLogout()

module.exports = Object.freeze({ postRegister, postLogin, postLogout })
