const express = require("express");
const controllers = require(".");
const expressCb = require("../../adapters/express-callback");
const Upload = require("../../adapters/Upload");

const postProduct = expressCb(controllers.postProduct);
const getDevices = expressCb(controllers.getDevices);
const getDevice = expressCb(controllers.getDevice);

const router = express.Router();

router.post("/devices",Upload.single('photo'), postProduct);
router.get("/devices", getDevices);
router.get("/devices/:id", getDevice);

module.exports = router;
