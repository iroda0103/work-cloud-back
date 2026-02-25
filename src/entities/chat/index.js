const Id = require("../../adapters/Id");
const buildMakeChat = require("./chat");

const makeChat = buildMakeChat({Id});

module.exports = makeChat;
