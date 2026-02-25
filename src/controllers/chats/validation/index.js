const { postChatSchema,postClientChatSchema } = require("./postChat")
const { getChatSchema } = require("./getChat")
const {getChatsSchema}=require("./getChats")

module.exports = {
    postChatSchema,
    postClientChatSchema,
    getChatSchema,
    getChatsSchema
}