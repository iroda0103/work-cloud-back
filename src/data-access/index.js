const mongoose = require('mongoose')
const config = require('../shared/config')
const usersDb = require('./usersDb')
const workspaceDb = require('./workspaceDb')
const sessionDb = require('./sessionDb')

module.exports = {
  connect() {
    return mongoose.connect(
      'mongodb://localhost:27017/',
      // process.env.MONGO_URI || `mongodb://${config.db.host}:${config.db.port || 27017}/`,
      { dbName: config.db.name }
    )
  },
  usersDb,
  workspaceDb,
  sessionDb,
}
