const Id = require("../../adapters/Id");
const Hash = require("../../adapters/Hash");
const buildMakeTeacherInfo = require("./teacher");

const makeTeacherInfo = buildMakeTeacherInfo({Id,Hash});

module.exports = makeTeacherInfo;
