const mongoose = require("mongoose");
const config = require("../shared/config");
const usersDb = require("./usersDb");

module.exports = {
  connect() {
    return mongoose.connect(
      // 'mongodb://mongo:bQTXQawmgiMnnCaeH8ZO@containers-us-west-34.railway.app:6973'
      'mongodb://localhost:27017/',
      // `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}`,
      {dbName: config.db.name}
    );
  },
  usersDb
};