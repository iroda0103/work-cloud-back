const Jwt = require("../Jwt");
const { mapErrorToStatus } = require("../../shared/errors/handle");

module.exports = function makeExpressCallback(
  controller,
  { checkLogin = false, checkRoles } = {}
) {
  if (checkRoles) checkLogin = true;

  return (req, res) => {
    let additional = {};

    if (checkLogin) {
      const { authorization } = req.headers;
      const token = (authorization || "").split(" ")[1];
      const result = Jwt.verifyToken(token);

      if (!result) {
        return res.status(401).json({ error: "Login qilmagansiz" });
      }

      additional.user = result.user;
    }

    if (checkRoles) {
      if (!checkRoles.some((role) => role === additional.user.role)) {
        return res.status(403).json({ error: "Siz ruxsatga ega emassiz" });
      }
    }

    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      path: req.path,
      ip: req.ip,
      headers: {
        "Content-Type": req.get("Content-Type"),
        "user-agent": req.get("user-agent"),
      },
      ...additional,
    };

    if (req.file) httpRequest.file = req.file;

    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) res.set(httpResponse.headers);
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((e) => {
        console.error(e);
        res.status(500).send({ error: "Serverda noma'lum xatolik yuz berdi." });
      });
  };
};
