const { addChat, showChat,listChat } = require("../../use-cases/chats");

const makePostChat = require("./postChat")
const makeGetChat = require("./getChat")
const makeGetChats = require("./getChats")

const postChat = makePostChat({ addChat });
const getChat = makeGetChat({ showChat })
const getChats = makeGetChats({ listChat })

const clientsController = Object.freeze({
    postChat,
    getChat,
    getChats
});

module.exports = clientsController;
