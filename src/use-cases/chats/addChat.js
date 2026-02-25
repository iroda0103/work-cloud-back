// const makeChat = require('../../entities/chat')
// const { BadRequestError, InvalidPropertyError } = require("../../shared/errors");

// /**
//  * @param {object} deps
//  * @param {import('../../data-access/chatDb')} deps.chatDb
//  * @param {import('../../data-access/usersDb')} deps.userDb
//  * @param {import('../../adapters/Upload')} deps.Upload
//  */
// module.exports = function makeAddChat({ userDb, chatDb, Upload }) {

//     return async function addChat(data) {
//         try {

//             const chat = makeChat({
//                 ...data
//             });

//             let chat_id = chat.getChatId()

//             if (data.from != 'admin') {
//                 const fromInfo = await userDb.findById({ id: chat.getFrom() });

//                 if (!fromInfo) {
//                     throw new BadRequestError(
//                         "Bunday from_idlik user mavjud emas"
//                     );
//                 }

//                 const chatFrom = await chatDb.findOne({ from: chat.getFrom() })

//                 if (chatFrom) {
//                     chat_id = chatFrom.chat_id
//                 }
// console.log(chat_id,'111111111111');
//             }

//             if (data.to != 'admin') {
//                 const toInfo = await userDb.findById({ id: chat.getTo() });

//                 if (!toInfo) {
//                     throw new BadRequestError(
//                         "Bunday to_idlik user mavjud emas"
//                     );
//                 }

//                 const chatTo = await chatDb.findOne({ to: chat.getFrom() })

//                 if (chatTo) {
//                     chat_id = chatTo.chat_id
//                 }
// console.log(chat_id,'2222222222');

//             }

//             if ((data.from == 'admin' && data.to == 'admin') || (data.from != 'admin' && data.to != 'admin')) {
//                 throw new Error('Admin bilan faqat client chatlasha oladi')
//             }

//             const result = await chatDb.insert({
//                 id: chat.getId(),
//                 chat_id,
//                 from: chat.getFrom(),
//                 to: chat.getTo(),
//                 text: chat.getText(),
//                 status: chat.getStatus(),
//                 photo: chat.getPhoto()
//             });

//             return result;
//         }
//         catch (e) {
//             await Upload.remove(data.photo)
//             throw e
//         }

//     };
// };

const makeChat = require('../../entities/chat')
const { BadRequestError, InvalidPropertyError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/chatDb')} deps.chatDb
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../adapters/Upload')} deps.Upload
 */
module.exports = function makeAddChat({ userDb, chatDb, Upload }) {

    return async function addChat(data) {
        try {
            if (data.from == data.to) {
                throw new InvalidPropertyError("User o'ziga o'zi xabar yubora olmaydi ")
            }

            if (!data.to) {
                const a=(await userDb.findOne({ role: "admin" })).id
               data.to=a
            }
            console.log(data);

            const chat = makeChat({
                ...data
            });

            let chat_id = chat.getChatId()

            const fromInfo = await userDb.findById({ id: chat.getFrom() });

            if (!fromInfo) {
                throw new BadRequestError(
                    "Bunday from_idlik user emas"
                );
            }
            let toInfo = null

            if (chat.to != 'admin') {
                toInfo = await userDb.findById({ id: chat.getTo() });

                if (!toInfo) {
                    throw new BadRequestError(
                        "Bunday to_idlik user mavjud emas"
                    );
                }

                if (!((fromInfo?.role == 'admin' && toInfo?.role == 'client') || (fromInfo?.role == 'client' || toInfo?.role == 'admin'))) {
                    throw new Error('Admin bilan faqat client chatlasha oladi')
                }
            }

            const chatFrom = await chatDb.findOne({ from: chat.getFrom() })

            if (chatFrom) {
                chat_id = chatFrom.chat_id
            }

            const chatTo = await chatDb.findOne({ to: chat.getFrom() })

            if (chatTo) {
                chat_id = chatTo.chat_id
            }

            const result = await chatDb.insert({
                id: chat.getId(),
                chat_id,
                from: chat.getFrom(),
                to: chat.getTo(),
                text: chat.getText(),
                status: chat.getStatus(),
                photo: chat.getPhoto()
            });

            return result;
        }
        catch (e) {
            await Upload.remove(data.photo)
            throw e
        }

    };
};