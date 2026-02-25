const { InvalidPropertyError } = require("../../shared/errors");

module.exports = function buildMakeClient({ Id,Hash }) {
    return function makeClient({
        id = Id.makeId(),
        user_id=Id.makeId(),
        teacher_id,
        service,
        first_name,
        last_name,
        role,
        birthday,
        email,
        password,
        phone,
        photo='default.png'
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

        if (!photo) {
            throw new InvalidPropertyError(
                "Foydalanuvchida rasm bo'lishi shart."
            );
        }

        if (!["admin", "teacher", "client"].includes(role)) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli role bo'lishi kk"
            );
        }


        if (!teacher_id) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli teacher_id bo'lishi kk"
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

        if (!service) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli service bo'lishi shart."
            );
        }

        if (!id) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli id bo'lishi shart."
            );
        }

        return Object.freeze({
            getId: () => id,
            getUserId: () => user_id,
            getService:()=>service,
            getTeacherId:()=>teacher_id,
            getFirstName: () => first_name,
            getLastName: () => last_name,
            getRole: () => role,
            getEmail: () => email,
            getPassword: () => password,
            getBirthDate: () => birthday,
            getPhoneNumber: () => phone,
            getPhoto:()=>photo,
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
