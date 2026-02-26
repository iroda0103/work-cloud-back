const {
  createWorkspace,
  listWorkspaces,
  showWorkspace,
  removeWorkspace,
  startWorkspace,
  stopWorkspace,
} = require('../../use-cases/workspaces')

const { listSessions } = require('../../use-cases/sessions')

const makeGetWorkspaces   = require('./getWorkspaces')
const makePostWorkspace   = require('./postWorkspace')
const makeGetWorkspace    = require('./getWorkspace')
const makeDeleteWorkspace = require('./deleteWorkspace')
const makePostStart       = require('./postStart')
const makePostStop        = require('./postStop')
const makeGetSessions     = require('./getSessions')

const getWorkspaces   = makeGetWorkspaces({ listWorkspaces })
const postWorkspace   = makePostWorkspace({ createWorkspace })
const getWorkspace    = makeGetWorkspace({ showWorkspace })
const deleteWorkspace = makeDeleteWorkspace({ removeWorkspace })
const postStart       = makePostStart({ startWorkspace })
const postStop        = makePostStop({ stopWorkspace })
const getSessions     = makeGetSessions({ listSessions })

module.exports = Object.freeze({
  getWorkspaces,
  postWorkspace,
  getWorkspace,
  deleteWorkspace,
  postStart,
  postStop,
  getSessions,
})
