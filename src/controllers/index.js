const express = require("express");
const usersRouter = require("./users/router");
const teacherRouter = require("./teachers/router")
const clientRouter = require("./clients/router")
const deviceRouter = require("./edibes/router")
const ediblesRouter = require("./devices/router")
const chatRouter = require("./chats/router")
const orderRouter = require("./order/router")
const productRouter = require("./products/router")

const api = express.Router();

api.use("/api", usersRouter, teacherRouter, clientRouter, deviceRouter, ediblesRouter, chatRouter, orderRouter, productRouter);

module.exports = api;
