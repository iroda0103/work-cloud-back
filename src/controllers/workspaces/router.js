const express    = require('express')
const expressCb  = require('../../adapters/express-callback')
const controllers = require('./')

const router = express.Router()

const auth      = { checkLogin: true }
const authOnly  = (ctrl) => expressCb(ctrl, auth)

router.get('/workspaces',                     authOnly(controllers.getWorkspaces))
router.post('/workspaces',                    authOnly(controllers.postWorkspace))
router.get('/workspaces/:id',                 authOnly(controllers.getWorkspace))
router.delete('/workspaces/:id',              authOnly(controllers.deleteWorkspace))
router.post('/workspaces/:id/start',          authOnly(controllers.postStart))
router.post('/workspaces/:id/stop',           authOnly(controllers.postStop))
router.get('/workspaces/:id/sessions',        authOnly(controllers.getSessions))

module.exports = router
