const Id = require("../../adapters/Id");
const buildMakeSavat = require("./savat");

const makeSavat = buildMakeSavat({ Id });

module.exports = makeSavat;
