const express = require("express");
const controllers = require(".");
const expressCb = require("../../adapters/express-callback");
const Upload = require("../../adapters/Upload");

const postProduct = expressCb(controllers.postEdibles);
const getEdibles = expressCb(controllers.getEdibles);
const getEdible=expressCb(controllers.getEdible)

const router = express.Router();

router.post("/edibles",Upload.single('photo'), postProduct);
router.get("/edibles", getEdibles);
router.get("/edibles/:id", getEdible);

module.exports = router;
