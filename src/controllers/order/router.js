const express = require("express");
const controllers = require("./");
const expressCb = require("../../adapters/express-callback");

const postOrder = expressCb(controllers.postOrder);
const getOrders=expressCb(controllers.getOrders)

const router = express.Router();

router.post("/orders", postOrder);
router.get("/orders",getOrders)

module.exports = router;
