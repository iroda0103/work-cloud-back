const workspaceDb = require('../../data-access/workspaceDb')
const sessionDb   = require('../../data-access/sessionDb')
const Docker      = require('../../adapters/Docker')

const makeCreateWorkspace  = require('./createWorkspace')
const makeListWorkspaces   = require('./listWorkspaces')
const makeShowWorkspace    = require('./showWorkspace')
const makeRemoveWorkspace  = require('./removeWorkspace')
const makeStartWorkspace   = require('./startWorkspace')
const makeStopWorkspace    = require('./stopWorkspace')

const createWorkspace  = makeCreateWorkspace({ workspaceDb })
const listWorkspaces   = makeListWorkspaces({ workspaceDb })
const showWorkspace    = makeShowWorkspace({ workspaceDb })
const removeWorkspace  = makeRemoveWorkspace({ workspaceDb, Docker })
const startWorkspace   = makeStartWorkspace({ workspaceDb, sessionDb, Docker })
const stopWorkspace    = makeStopWorkspace({ workspaceDb, sessionDb, Docker })

module.exports = Object.freeze({
  createWorkspace,
  listWorkspaces,
  showWorkspace,
  removeWorkspace,
  startWorkspace,
  stopWorkspace,
})
