const { addClient, listClient,showClient,removeClient } = require("../../use-cases/clients");

const makePostClient = require("./postClient")
const makeGetClients = require("./getClients")
const makeShowClient=require("./getClient")
const makeDeleteClient=require("./deleteClient")

const postClient = makePostClient({ addClient });
const getClients=makeGetClients({listClient})
const getClient=makeShowClient({showClient})
const deleteClient=makeDeleteClient({removeClient})

const clientsController = Object.freeze({
  postClient,
  getClients,
  getClient,
  deleteClient
});

module.exports = clientsController;
