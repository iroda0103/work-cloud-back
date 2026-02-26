const express    = require('express')
const expressCb  = require('../../adapters/express-callback')
const controllers = require('./')

const router = express.Router()

router.post('/auth/register', expressCb(controllers.postRegister))
router.post('/auth/login',    expressCb(controllers.postLogin))
router.post('/auth/logout',   expressCb(controllers.postLogout, { checkLogin: true }))

module.exports = router
