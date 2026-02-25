const { InvalidPropertyError } = require("../../shared/errors");

module.exports = function buildMakeUser({ Id, Hash }) {
  return function makeUser({
    id = Id.makeId(),
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

    if (!id) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli id bo'lishi shart."
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

    if (!first_name) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli firts_name bo'lishi shart."
      );
    }

    return Object.freeze({
      getId: () => id,
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
