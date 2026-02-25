const express = require("express");
const controllers = require("./");
const expressCb = require("../../adapters/express-callback");
const Upload = require("../../adapters/Upload");

const postChat = expressCb(controllers.postChat, { checkLogin: true });
const getChat = expressCb(controllers.getChat, { checkLogin: true });
const getChats = expressCb(controllers.getChats, { checkRoles: ["admin"] });

const router = express.Router();

router.post("/chats", Upload.single('photo'), postChat);
router.get("/chats/:id", getChat);
router.get("/chats", getChats);

module.exports = router;
