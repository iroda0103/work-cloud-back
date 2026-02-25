const { ObjectId } = require("bson");
const { isValidObjectId } = require("mongoose");

const Id = Object.freeze({
  makeId: () => new ObjectId(),
  isValidId: isValidObjectId
});

module.exports = Id;
