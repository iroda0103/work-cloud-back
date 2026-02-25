const Id = require('../../adapters/Id')
const Code = require('../../adapters/Code')
const buildMakeVerification = require('./verification')

const makeVerification = buildMakeVerification({ Id, Code })

module.exports = makeVerification
