// const { InvalidPropertyError } = require("../../shared/errors");

// module.exports = function buildMakeTeacherInfo({ Id }) {
//     return function makeTeacherInfo({
//         id = Id.makeId(),
//         user_id,
//         info,
//         category,
//         kun
//     } = {}) {
//         if (!user_id) {
//             throw new InvalidPropertyError(
//                 "Foydalanuvchida yaroqli user_id bo'lishi shart."
//             );
//         }

//         if (!info) {
//             throw new InvalidPropertyError(
//                 "Foydalanuvchida yaroqli info bo'lishi shart."
//             );
//         }

//         if (!category) {
//             throw new InvalidPropertyError(
//                 "Foydalanuvchida yaroqli category bo'lishi shart."
//             );
//         }

//         if (!['juft', 'toq'].includes(kun)) {
//             throw new InvalidPropertyError(
//                 "Foydalanuvchida yaroqli kun bo'lishi shart."
//             );
//         }

//         if (!id) {
//             throw new InvalidPropertyError(
//                 "Foydalanuvchida yaroqli id bo'lishi shart."
//             );
//         }

//         return Object.freeze({
//             getId: () => id,
//             getcategory: () => category,
//             getKun: () => kun,
//             getinfo: () => info,
//             getUserId: () => user_id
//         });
//     };
// };


const { InvalidPropertyError } = require("../../shared/errors");

module.exports = function buildMakeTeacherInfo({ Id,Hash }) {
    return function makeTeacherInfo({
        id = Id.makeId(),
        user_id=Id.makeId(),
        info,
        category,
        kun,
        first_name,
        last_name,
        role,
        birthday,
        email,
        password,
        gender,
        phone,
        photo='ustoz_1.png'
    } = {}) {

        if (!last_name) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli last_name bo'lishi shart."
            );
        }

        if (!email) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli email bo'lishi shart."
            );
        }

        if (!password) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli password bo'lishi shart."
            );
        }

        if (!phone || !isValidphone(phone)) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli phone bo'lishi shart."
            );
        }


        if (!role) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli rol (role) bo'lishi shart."
            );
        }

        if (!["admin", "teacher", "client"].includes(role)) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli role bo'lishi kk"
            );
        }


        if (!["erkak", "ayol"].includes(gender)) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli jins bo'lishi kk"
            );
        }

        if (!first_name) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli firts_name bo'lishi shart."
            );
        }
        if (!user_id) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli user_id bo'lishi shart."
            );
        }

        if (!info) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli info bo'lishi shart."
            );
        }

        if (!category) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli category bo'lishi shart."
            );
        }

        if (!['juft', 'toq'].includes(kun)) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli kun bo'lishi shart."
            );
        }

        if (!id) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli id bo'lishi shart."
            );
        }

        if (!photo) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli rasm bo'lishi shart."
            );
        }

        return Object.freeze({
            getId: () => id,
            getCategory: () => category,
            getKun: () => kun,
            getinfo: () => info,
            getUserId: () => user_id,
            getFirstName: () => first_name,
            getLastName: () => last_name,
            getRole: () => role,
            getEmail: () => email,
            getPassword: () => password,
            getBirthDate: () => birthday,
            getGender: () => gender,
            getPhoneNumber: () => phone,
            getPhoto: () => photo,
            hashPassword,
            comparePassword
        });

           function isValidphone(phone) {
      return phone > 998000000000 && phone < 998999999999
    }

    function hashPassword() {
      password = Hash.generate(password);
    }

    function comparePassword(plain) {
      return Hash.compare(plain, password);
    }
    };
};
