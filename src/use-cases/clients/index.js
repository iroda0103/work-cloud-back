const userDb = require("../../data-access/usersDb");
const teacherInfoDb = require('../../data-access/teacherInfoDb')
const clientInfoDb = require('../../data-access/clientInfoDb')
const Upload = require('../../adapters/Upload')

const makeAddClient = require("./addClient")
const makeListClient = require("./listClient")
const makeShowClient = require("./showClient")
const makeDeleteClient = require("./removeClient")

const addClient = makeAddClient({ userDb, teacherInfoDb, clientInfoDb, Upload });
const listClient = makeListClient({ clientInfoDb });
const showClient = makeShowClient({ clientInfoDb })
const removeClient = makeDeleteClient({ clientInfoDb,Upload })

const clientUseCases = Object.freeze({
    addClient,
    listClient,
    showClient,
    removeClient
});

module.exports = clientUseCases;



















