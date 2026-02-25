const {postClientSchema}=require('./postClient')
const {getClientsSchema}=require("./getClients")
const {getClientSchema}=require("./getClient")
const {deleteClientSchema}=require("./deleteClient")

module.exports={
    postClientSchema,
    getClientsSchema,
    getClientSchema,
    deleteClientSchema
}