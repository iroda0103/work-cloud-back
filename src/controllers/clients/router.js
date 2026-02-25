const express = require("express");
const controllers = require("./");
const expressCb = require("../../adapters/express-callback");
const Upload = require("../../adapters/Upload");

const postClient = expressCb(controllers.postClient, { checkRoles: ["admin"] });
const getClients = expressCb(controllers.getClients, { checkRoles: ["admin"] });
const getClient = expressCb(controllers.getClient, { checkRoles: ["admin"] });
const deleteClient = expressCb(controllers.deleteClient, { checkRoles: ["admin"] })

const router = express.Router();

router.post("/clients", Upload.single('photo'), postClient);
router.get("/clients", getClients);
router.get("/clients/:id", getClient);
router.delete("/clients/:id", deleteClient);

module.exports = router;
