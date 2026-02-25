const {
  addUser,
  listUser,
  showUser,
  removeUser,
  loginUser,
  editUser,
  verifyUser,
  forgotUser,
  verifyForgotPassword
} = require("../../use-cases/users");

const makePostUser = require("./postUser");
const makeGetUsers = require("./getUsers");
const makeGetUser = require("./getUser");
const makeDeleteUser = require("./deleteUser");
const makeLoginUser = require("./loginUser");
const makeVerification = require("./verifyUser");
const makeGetUserMe = require("./getUserMe");
const makeEditUser = require("./patchUser");
const makePatchMe = require("./patchMe");
const makeForgotUser = require("./postForgotPassword");
const makeVerifyForgotPassword = require("./verifyForgotPassword");

const postUser = makePostUser({ addUser });
const getUsers = makeGetUsers({ listUser });
const getUser = makeGetUser({ showUser });
const getUserMe = makeGetUserMe({ showUser });
const deleteUser = makeDeleteUser({ removeUser });
const postLoginUser = makeLoginUser({ loginUser });
const postVerifyUser = makeVerification({ verifyUser });
const patchUser = makeEditUser({ editUser });
const patchMe = makePatchMe({ editUser });
const postForgotPassword = makeForgotUser({ forgotUser });
const postVerifyForgotPassword = makeVerifyForgotPassword({ verifyForgotPassword });

const usersController = Object.freeze({
  postUser,
  getUsers,
  getUser,
  deleteUser,
  postLoginUser,
  getUserMe,
  patchUser,
  patchMe,
  postVerifyUser,
  postForgotPassword,
  postVerifyForgotPassword
});

module.exports = usersController;
