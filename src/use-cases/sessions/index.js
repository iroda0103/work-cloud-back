const workspaceDb = require('../../data-access/workspaceDb')
const sessionDb   = require('../../data-access/sessionDb')

const makeListSessions = require('./listSessions')

const listSessions = makeListSessions({ workspaceDb, sessionDb })

module.exports = Object.freeze({ listSessions })
