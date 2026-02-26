const Id = require('../../adapters/Id')
const buildMakeSession = require('./session')

const makeSession = buildMakeSession({ Id })

module.exports = makeSession
