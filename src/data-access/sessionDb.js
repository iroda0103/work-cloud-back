const model = require('./mongo/models/sessionModel')

const sessionDb = Object.freeze({
  insert,
  findAll,
  findById,
  findOne,
  disconnect,
})

async function insert({ id: _id, ...info }) {
  const result = await model.create({ _id, ...info })
  const { _id: id, ...rest } = result.toObject()
  return { id, ...rest }
}

async function findAll({ filters = {}, page, sort } = {}) {
  let dbQuery = model.find(filters)

  const total = await dbQuery.clone().countDocuments().exec()

  if (page) {
    dbQuery.limit(page.limit).skip(page.offset)
  }

  if (sort) {
    dbQuery.sort({ [sort.by]: sort.order === 'asc' ? 1 : -1 })
  }

  const result = await dbQuery.lean()
  const data = result.map(({ _id: id, ...info }) => ({ id, ...info }))

  return { data, total }
}

async function findById({ id: _id }) {
  const result = await model.findById(_id).lean()
  if (!result) return null
  const { _id: id, ...info } = result
  return { id, ...info }
}

async function findOne(filter) {
  const result = await model.findOne(filter).lean()
  if (!result) return null
  const { _id: id, ...info } = result
  return { id, ...info }
}

// Sessiyani yopish: disconnected_at va duration_sec to'ldirish
async function disconnect({ id: _id, disconnected_at, duration_sec }) {
  const result = await model
    .findOneAndUpdate({ _id }, { disconnected_at, duration_sec }, { new: true })
    .lean()
  if (!result) return null
  const { _id: id, ...rest } = result
  return { id, ...rest }
}

module.exports = sessionDb
