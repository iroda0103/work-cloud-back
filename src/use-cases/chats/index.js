const userDb = require("../../data-access/usersDb");
const chatDb = require("../../data-access/chatDb")
const Upload = require("../../adapters/Upload")

const makeAddChat = require("./addChat")
const makeShowChat = require("./showChat")
const makeListChat = require("./listChat")

const addChat = makeAddChat({ userDb, chatDb,Upload })
const showChat = makeShowChat({ chatDb })
const listChat = makeListChat({ chatDb })

const chatUseCases = Object.freeze({
    addChat,
    showChat,
    listChat
});

module.exports = chatUseCases;



















