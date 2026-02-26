const usersDb     = require('../../data-access/usersDb')
const workspaceDb = require('../../data-access/workspaceDb')

const makeListUsers          = require('./listUsers')
const makeEditUser           = require('./editUser')
const makeListAllWorkspaces  = require('./listAllWorkspaces')

const listUsers         = makeListUsers({ usersDb })
const editUser          = makeEditUser({ usersDb })
const listAllWorkspaces = makeListAllWorkspaces({ workspaceDb })

module.exports = Object.freeze({ listUsers, editUser, listAllWorkspaces })
