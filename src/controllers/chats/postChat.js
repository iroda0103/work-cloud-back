// const { InvalidPropertyError } = require("../../shared/errors");
// const { mapErrorToStatus } = require("../../shared/errors/handle");
// const httpValidator = require("../../shared/validator");
// const { postChatSchema, postClientChatSchema } = require("./validation");

// module.exports = function makePostChat({ addChat }) {
//     return async function postChat(httpRequest) {
//         try {
//             let validator;
//             let from = httpRequest.user.id
//             let to;
//             if (httpRequest.user.role == 'client') {
//                 validator = httpValidator(
//                     { body: httpRequest.body },
//                     postClientChatSchema
//                 );
//                 to = 'admin'
//             }
//             else {
//                 from = 'admin'
//                 validator = httpValidator(
//                     { body: httpRequest.body },
//                     postChatSchema
//                 );
//             }
//             const { error, body } = await validator.validate();

//             if (error) {
//                 throw new InvalidPropertyError(error);
//             }

//             const data = await addChat({ from,to,...body, photo: httpRequest?.file?.filename });

//             return {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 statusCode: 201,
//                 body: { data }
//             };
//         } catch (e) {
//             console.log(e);

//             return {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 statusCode: mapErrorToStatus(e),
//                 body: {
//                     message: e.message
//                 }
//             };
//         }
//     };
// };

const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { postChatSchema } = require("./validation");

module.exports = function makePostChat({ addChat }) {
    return async function postChat(httpRequest) {
        try {
            const validator = httpValidator(
                { body: httpRequest.body },
                postChatSchema
            );
            const { error, body } = await validator.validate();

            if (error) {
                throw new InvalidPropertyError(error);
            }

            const data = await addChat({  from: httpRequest.user.id,...body, photo: httpRequest?.file?.filename });

            return {
                headers: {
                    "Content-Type": "application/json"
                },
                statusCode: 201,
                body: { data }
            };
        } catch (e) {
            console.log(e);

            return {
                headers: {
                    "Content-Type": "application/json"
                },
                statusCode: mapErrorToStatus(e),
                body: {
                    message: e.message
                }
            };
        }
    };
};
