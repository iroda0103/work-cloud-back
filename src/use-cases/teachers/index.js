const userDb = require("../../data-access/usersDb");
const Upload = require("../../adapters/Upload")
const teacherInfoDb = require('../../data-access/teacherInfoDb')

const makeAddTeacher = require("./addTeacher");
const makeListTeachers = require('./listTeacher');
const makeShowTeacher = require("./showTeacher")
const makeRemoveTeacher = require("./removeTeacher")
const makeEditTeacher = require("./editTeacher")

const addTeacher = makeAddTeacher({ userDb, teacherInfoDb, Upload });
const listTeacher = makeListTeachers({ teacherInfoDb })
const showTeacher = makeShowTeacher({ teacherInfoDb })
const removeTeacher = makeRemoveTeacher({ teacherInfoDb,Upload })
const editTeacher = makeEditTeacher({ teacherInfoDb, Upload })

const teacherUseCases = Object.freeze({
    addTeacher,
    listTeacher,
    showTeacher,
    removeTeacher,
    editTeacher
});

module.exports = teacherUseCases;



















