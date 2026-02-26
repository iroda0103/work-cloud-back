const express    = require('express')
const expressCb  = require('../../adapters/express-callback')
const controllers = require('./')

const router = express.Router()

const admin = { checkRoles: ['admin'] }

router.get('/admin/users',        expressCb(controllers.getUsers,        admin))
router.patch('/admin/users/:id',  expressCb(controllers.patchUser,       admin))
router.get('/admin/workspaces',   expressCb(controllers.getAllWorkspaces, admin))

module.exports = router
