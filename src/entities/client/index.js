const Id = require("../../adapters/Id");
const Hash = require("../../adapters/Hash");
const buildMakeClient = require("./client");

const makeClient = buildMakeClient({ Id, Hash });

module.exports = makeClient;
