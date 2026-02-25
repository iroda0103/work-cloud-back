const express = require("express");
const controllers = require("./");
const expressCb = require("../../adapters/express-callback");
const Upload = require("../../adapters/Upload");

const postUser = expressCb(controllers.postUser);
const getUsers = expressCb(controllers.getUsers, { checkRoles: ["admin"] });
const getUser = expressCb(controllers.getUser, { checkRoles: ["admin"] });
const deleteUser = expressCb(controllers.deleteUser, { checkRoles: ["admin"] });
const postLoginUser = expressCb(controllers.postLoginUser);
const postVerifyUser = expressCb(controllers.postVerifyUser);
const getUserMe = expressCb(controllers.getUserMe, { checkLogin: true });
const patchUser = expressCb(controllers.patchUser, { checkRoles: ["admin"] });
const patchMe = expressCb(controllers.patchMe, { checkLogin: true });
const postForgotPassword = expressCb(controllers.postForgotPassword);
const postVerifyForgotPassword = expressCb(controllers.postVerifyForgotPassword);

const router = express.Router();

router.post("/users", Upload.single('photo'), postUser);
router.post("/users/login", postLoginUser);
router.post("/users/verify", postVerifyUser);
router.post("/users/forgot", postForgotPassword);
router.post("/users/forgot-verify", postVerifyForgotPassword);
router.get("/users", getUsers);
router.get("/users/me", getUserMe);
router.get("/users/:id", getUser);
router.patch("/users/me", patchMe);
router.patch("/users/:id", patchUser);
router.delete("/users/:id", deleteUser);
router.get("/nimadir", (req, res) => {
    res.send('jjj')
});

module.exports = router;
