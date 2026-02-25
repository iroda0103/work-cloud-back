const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { patchTeacherSchema } = require("./validation");

module.exports = function makePatchTeacher({ editTeacher }) {
  return async function patchTeacher(httpRequest) {
    try {
      const validator = httpValidator(
        { body: httpRequest.body,params:httpRequest.params },
        patchTeacherSchema
      );
      const { error, body ,params} = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const data = await editTeacher({ ...body,...params, role: "teacher", photo: httpRequest?.file?.filename });

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
