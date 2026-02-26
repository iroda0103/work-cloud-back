const express          = require("express");
const authRouter       = require("./auth/router");
const workspacesRouter = require("./workspaces/router");
const adminRouter      = require("./admin/router");

const api = express.Router();

api.use("/api", authRouter, workspacesRouter, adminRouter);

module.exports = api;
