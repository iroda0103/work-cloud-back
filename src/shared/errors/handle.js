const {
  InvalidPropertyError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  ServiceUnavailableError,
} = require("./index");

exports.mapErrorToStatus = (err) => {
  if (err instanceof InvalidPropertyError || err instanceof BadRequestError) return 400;
  if (err instanceof UnauthorizedError) return 401;
  if (err instanceof ForbiddenError) return 403;
  if (err instanceof NotFoundError) return 404;
  if (err instanceof ConflictError) return 409;
  if (err instanceof ServiceUnavailableError) return 503;
  return 500;
};
