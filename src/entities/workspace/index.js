const Id = require('../../adapters/Id')
const buildMakeWorkspace = require('./workspace')

const makeWorkspace = buildMakeWorkspace({ Id })

module.exports = makeWorkspace
