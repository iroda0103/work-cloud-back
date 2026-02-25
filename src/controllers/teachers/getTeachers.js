const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getTeachersSchema } = require("./validation");

module.exports = function makeGetTeachers({ listTeacher }) {
  return async function getTeachers(httpRequest) {
    try {
      const validator = httpValidator(
        { query: httpRequest.query },
        getTeachersSchema
      );
      const { error, query } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const result = await listTeacher({ ...query });

      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 200,
        body: { ...result }
      };
    } catch (e) {
      console.log(e);

      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: mapErrorToStatus(e),
        body: { message: e.message }
      };
    }
  };
};
