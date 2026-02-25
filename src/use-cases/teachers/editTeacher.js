const makeTeacherInfo = require('../../entities/teacher')
const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/teacherInfoDb')} deps.teacherInfoDb
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../adapters/Upload')} deps.Upload
 */
module.exports = function makeEditTeacher({ teacherInfoDb, Upload, userDb }) {
    return async function editTeacher({ id, ...changes }) {
        try {
            const teacherToEdit = await teacherInfoDb.findById({ id });

            if (!teacherToEdit) {
                throw new NotFoundError("Foydalanuvchi topilmadi.");
            }

            const teacher = makeTeacherInfo({ ...teacherToEdit, ...changes });

            if (teacher.getEmail() != teacherToEdit.email) {
                const teacherInfo = await userDb.findOne({ email: teacher.getEmail() });

                if (teacherInfo) {
                    throw new BadRequestError(
                        "Bunday nomli Email mavjud boshqa email tanlang"
                    );
                }
            }
            console.log(teacher.getUserId(), 'ppppppppppppp');
            teacher.hashPassword();
            const result = await teacherInfoDb.update({
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
            if (changes.photo) {
                await Upload.remove(data.photo)
            }
            throw e
        }

    };
};
