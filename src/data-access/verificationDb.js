const model = require('./mongo/models/verificationModel')

const verificationDb = Object.freeze({
    insert,
    remove,
    findLatestOne
})


async function insert({ id: _id, ...info }) {
    const result = await model.create({ _id, ...info })
    const { _id: id, ...rest } = result.toObject()
    return { id, ...rest }
}

async function remove({ id: _id }) {
    await model.updateOne({ _id }).lean()
    return true
}

async function findLatestOne(params) {
    const result = await model
        .findOne(params)
        .sort({ created_at: -1 })
        .lean()
    if (!result) {
        return null
    }
    const { _id: id, ...info } = result
    return { id, ...info }
}


module.exports = verificationDb