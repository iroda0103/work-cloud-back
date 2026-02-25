const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getProductsSchema } = require("../products/validation");

module.exports = function makeGetEdibles({ listProducts }) {
  return async function getEdibles(httpRequest) {
    try {
      const validator = httpValidator(
        { query: httpRequest.query },
        getProductsSchema
      );
      const { error, query } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const result = await listProducts({ ...query ,filters:{category:"edibles"}});

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
