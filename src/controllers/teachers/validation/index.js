const { postTeacherSchema } = require("./postTeacher");
const { getTeachersSchema } = require("./getTeachers")
const { getTeacherSchema } = require("./getTeacher")
const { deleteTeacherSchema } = require("./deleteTeacher")
const { patchTeacherSchema } = require("./patchTeacher")

module.exports = {
    postTeacherSchema,
    getTeachersSchema,
    getTeacherSchema,
    deleteTeacherSchema,
    patchTeacherSchema
};
