const express = require("express");
const controllers = require("./");
const expressCb = require("../../adapters/express-callback");
const Upload = require("../../adapters/Upload");

const postTeacher = expressCb(controllers.postTacher, { checkRoles: ["admin"] });
const getTeachers = expressCb(controllers.getTeachers, { checkLogin: true });
const getTeacher = expressCb(controllers.getTeacher, { checkLogin: true });
const deleteTeacher = expressCb(controllers.deleteTeacher, { checkRoles: ["admin"] });
const patchTeacher = expressCb(controllers.patchTeacher, { checkRoles: ["admin"] });

const router = express.Router();

router.post("/teachers", Upload.single('photo'), postTeacher);
router.get("/teachers", getTeachers);
router.get("/teachers/:id", getTeacher);
router.delete("/teachers/:id", deleteTeacher);
router.patch("/teachers/:id",  Upload.single('photo'),patchTeacher);

module.exports = router;
