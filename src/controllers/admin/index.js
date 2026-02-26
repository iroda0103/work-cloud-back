const { listUsers, editUser, listAllWorkspaces } = require('../../use-cases/admin')

const makeGetUsers         = require('./getUsers')
const makePatchUser        = require('./patchUser')
const makeGetAllWorkspaces = require('./getWorkspaces')

const getUsers        = makeGetUsers({ listUsers })
const patchUser       = makePatchUser({ editUser })
const getAllWorkspaces = makeGetAllWorkspaces({ listAllWorkspaces })

module.exports = Object.freeze({ getUsers, patchUser, getAllWorkspaces })
