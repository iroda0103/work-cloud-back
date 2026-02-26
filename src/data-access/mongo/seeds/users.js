const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { ObjectId } = require('mongodb')
const config = require('../../../shared/config')

const User = require('../models/userModel')
const Workspace = require('../models/workspaceModel')

mongoose
  .connect(
    process.env.MONGO_URI || `mongodb://${config.db.host}:${config.db.port || 27017}/`,
    { dbName: config.db.name }
  )
  .then(() => console.log('DB ga ulandi.'))
  .catch((err) => console.log('DB da xatolik:', err))

const seedUsers = [
  {
    _id: new ObjectId('64dfb699c7ea86c4037cbbf9'),
    username: 'admin1',
    email: 'admin1@workcloud.uz',
    password_hash: bcrypt.hashSync('Admin123!', 10),
    role: 'admin',
    is_active: true,
  },
  {
    _id: new ObjectId('64dfb699c7ea86c4037cbbf8'),
    username: 'teacher1',
    email: 'teacher1@workcloud.uz',
    password_hash: bcrypt.hashSync('Teacher123!', 10),
    role: 'teacher',
    is_active: true,
  },
  {
    _id: new ObjectId('64dfb699c7ea86c4037cbbf7'),
    username: 'student1',
    email: 'student1@workcloud.uz',
    password_hash: bcrypt.hashSync('Student123!', 10),
    role: 'student',
    is_active: true,
  },
]

const seedWorkspaces = [
  {
    _id: new ObjectId('65166faf3b362ef26dfbabc4'),
    user_id: new ObjectId('64dfb699c7ea86c4037cbbf7'),
    name: 'Python Lab',
    template: 'python',
    status: 'not_created',
  },
  {
    _id: new ObjectId('65166faf3b362ef26dfbabc5'),
    user_id: new ObjectId('64dfb699c7ea86c4037cbbf7'),
    name: 'Node.js Lab',
    template: 'nodejs',
    status: 'not_created',
  },
]

const seedDB = async () => {
  await User.deleteMany({})
  await User.insertMany(seedUsers)
  console.log('Users seeded:', seedUsers.length)

  await Workspace.deleteMany({})
  await Workspace.insertMany(seedWorkspaces)
  console.log('Workspaces seeded:', seedWorkspaces.length)
}

seedDB()
  .then(() => {
    console.log('Seed tugadi.')
    mongoose.connection.close()
  })
  .catch((err) => {
    console.error('Seed xatosi:', err)
    mongoose.connection.close()
  })
