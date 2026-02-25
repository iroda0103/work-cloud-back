const {
  addTeacher,
  listTeacher,
  showTeacher,
  removeTeacher,
  editTeacher
} = require("../../use-cases/teachers");

const makePostTeacher = require("./postTeacher")
const makeGetTeachers = require("./getTeachers")
const makeGetTeacher = require("./getTeacher")
const makeDeleteTeacher = require("./deleteTeacher")
const makePatchTeacher = require("./patchTeacher")

const postTacher = makePostTeacher({ addTeacher });
const getTeachers = makeGetTeachers({ listTeacher })
const getTeacher = makeGetTeacher({ showTeacher })
const deleteTeacher = makeDeleteTeacher({ removeTeacher })
const patchTeacher = makePatchTeacher({ editTeacher })

const teachersController = Object.freeze({
  postTacher,
  getTeachers,
  getTeacher,
  deleteTeacher,
  patchTeacher
});

module.exports = teachersController;
