const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { postTeacherSchema } = require("./validation");

module.exports = function makePostTeacher({ addTeacher }) {
  return async function postTeacher(httpRequest) {
    try {
      const validator = httpValidator(
        { body: httpRequest.body },
        postTeacherSchema
      );
      const { error, body } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const data = await addTeacher({ ...body, role: "teacher", photo: httpRequest?.file?.filename });

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
