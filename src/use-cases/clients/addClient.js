const makeClient = require('../../entities/client')
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../data-access/clientInfoDb')} deps.clientInfoDb
 * @param {import('../../data-access/teacherInfoDb')} deps.teacherInfoDb
 * @param {import("../../adapters/Upload")} deps.Upload
 */
module.exports = function makeAddClient({ userDb, teacherInfoDb, clientInfoDb, Upload }) {

    return async function addClient(data) {

        try {
            const client = makeClient({
                ...data
            });

            const clientInfo = await userDb.findOne({ email: client.getEmail() });

            if (clientInfo) {
                throw new BadRequestError(
                    "Bunday nomli Email mavjud boshqa email tanlang"
                );
            }

            const clientInfoPhone = await userDb.findOne({ phone: client.getPhoneNumber() });

            if (clientInfoPhone) {
                throw new BadRequestError(
                    "Bunday nomli telefon nomer mavjud boshqa nomer tanlang"
                );
            }

            const teacher = await teacherInfoDb.findById({ id: client.getTeacherId() });

            if (!teacher) {
                throw new BadRequestError(
                    "Bunday idlik  teacher mavjud emas"
                );
            }

            client.hashPassword();
            const result = await clientInfoDb.insert({
                id: client.getId(),
                first_name: client.getFirstName(),
                last_name: client.getLastName(),
                birthday: client.getBirthDate(),
                role: client.getRole(),
                email: client.getEmail(),
                phone: client.getPhoneNumber(),
                password: client.getPassword(),
                teacher_id: client.getTeacherId(),
                user_id: client.getUserId(),
                service: client.getService(),
                photo: client.getPhoto()
            });

            return result;
        }
        catch (e) {
            await Upload.remove(data.photo)
            throw e
        }

    };
};
