const express = require("express");
const controllers = require(".");
const expressCb = require("../../adapters/express-callback");

const deleteProduct = expressCb(controllers.deleteProduct);

const router = express.Router();

router.delete("/products/:id", deleteProduct);

module.exports = router;
