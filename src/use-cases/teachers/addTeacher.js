const makeTeacherInfo = require('../../entities/teacher')
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../data-access/teacherInfoDb')} deps.teacherInfoDb
 * @param {import("../../adapters/Upload")} deps.Upload
 */
module.exports = function makeAddTeacher({ userDb, teacherInfoDb, Upload }) {
    return async function addTeacher(data) {
        try {
            const teacher = makeTeacherInfo({
                ...data
            });

            const teacherInfo = await userDb.findOne({ email: teacher.getEmail() });

            if (teacherInfo) {
                throw new BadRequestError(
                    "Bunday nomli Email mavjud boshqa email tanlang"
                );
            }

            const teacherInfoPhone = await userDb.findOne({ phone: teacher.getPhoneNumber() });

            if (teacherInfoPhone) {
                throw new BadRequestError(
                    "Bunday nomli telefon nomer mavjud boshqa nomer tanlang"
                );
            }


            teacher.hashPassword();
            const result = await teacherInfoDb.insert({
                id: teacher.getId(),
                first_name: teacher.getFirstName(),
                last_name: teacher.getLastName(),
                birthday: teacher.getBirthDate(),
                role: teacher.getRole(),
                email: teacher.getEmail(),
                phone: teacher.getPhoneNumber(),
                password: teacher.getPassword(),
                gender: teacher.getGender(),
                user_id: teacher.getUserId(),
                category: teacher.getCategory(),
                kun: teacher.getKun(),
                info: teacher.getinfo(),
                photo: teacher.getPhoto()
            });

            return result;
        }
        catch (e) {
            await Upload.remove(data.photo)
            throw e
        }

    };
};
