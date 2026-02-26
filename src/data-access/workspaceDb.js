const model = require('./mongo/models/workspaceModel')

const workspaceDb = Object.freeze({
  insert,
  findAll,
  findAllPopulated,
  findById,
  findByUserId,
  remove,
  update,
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

// Admin uchun: workspace + user ma'lumotlari birgalikda
async function findAllPopulated({ filters = {}, page, sort } = {}) {
  let dbQuery = model.find(filters).populate('user_id', 'username email')

  const total = await model.countDocuments(filters)

  if (page) {
    dbQuery.limit(page.limit).skip(page.offset)
  }

  if (sort) {
    dbQuery.sort({ [sort.by]: sort.order === 'asc' ? 1 : -1 })
  }

  const result = await dbQuery.lean({ virtuals: true })
  return {
    data: result.map(({ _id: id, user_id: user, ...info }) => ({ id, user, ...info })),
    total,
  }
}

async function findByUserId({ user_id }) {
  const result = await model.find({ user_id }).lean()
  return result.map(({ _id: id, ...info }) => ({ id, ...info }))
}

async function remove({ id: _id }) {
  return model.deleteOne({ _id })
}

async function update({ id: _id, ...data }) {
  const result = await model.findOneAndUpdate({ _id }, data, { new: true }).lean()
  if (!result) return null
  const { _id: id, ...rest } = result
  return { id, ...rest }
}

module.exports = workspaceDb
