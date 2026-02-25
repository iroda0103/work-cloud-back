const model = require("./mongo/models/clientInfoModel");
const userModel = require("./mongo/models/userModel");

const clientInfoDb = Object.freeze({
  insert,
  findAll,
  findById,
  findOne,
  remove,
  update
});

async function insert({ id: _id, user_id, teacher_id, service, ...infoTeacher }) {
  const resultUser = await userModel.create({ _id: user_id, ...infoTeacher });
  const result = await model.create({ user_id, teacher_id, service })
  const { _id: id, res } = result;
  return { id, ...infoTeacher, teacher_id, service };
}

async function findAll({ q, page, sort }) {
  const filter = {};

  if (q) {
    filter.$or = [
      { first_name: { $regex: `.*${q}.*`, $options: "i" } },
      { last_name: { $regex: `.*${q}.*`, $options: "i" } },
      { username: { $regex: `.*${q}.*`, $options: "i" } }
    ];
  }

  let dbQuery = model.find(filter);

  const total = await dbQuery.clone().count().exec();

  if (page) {
    dbQuery.limit(page.limit).skip(page.offset);
  }

  if (sort) {
    dbQuery.sort({ [sort.by]: sort.order == "asc" ? 1 : -1 });
  }

  const result = await dbQuery.populate([
    { path: "user_id", select: "-password -_id" },
    {
      path: "teacher_id",
      select: "",
      populate: {
        path: "user_id",
        select: "-_id -password"
      }
    }]).lean();

  const res = result.map((user) => {
    const { _id: id, user_id, teacher_id, ...info } = user;
    let teacher = null
    if (teacher_id) {
      const { user_id: user_id_teacher, ...teacherInfo } = teacher_id
      teacher ={ ...teacherInfo, ...user_id_teacher }
    }

    return { id, ...user_id, ...info, teacher };
  });

  return { data: res, total };
}

async function findById({ id: _id }) {
  const result = await model
    .findById({ _id }).populate([
      { path: "user_id", select: "-password -_id" },
      {
        path: "teacher_id",
        select: "",
        populate: {
          path: "user_id",
          select: "-_id -password"
        }
      }]).lean();

  if (!result) {
    return null;
  }

  const { _id: id, user_id, teacher_id, ...info } = result;
  let teacher = null
  if (teacher_id) {
    const { user_id: user_id_teacher, _id: teacherInfo_id, ...teacherInfo } = teacher_id
    teacher = { id: teacherInfo_id, ...user_id_teacher, ...teacherInfo }
  }


  return { id, ...user_id, teacher, ...info };
}

async function findOne(filter) {
  const result = await model.findOne(filter).lean();

  if (!result) {
    return null;
  }

  const { _id: id, ...info } = result;
  return { id, ...info };
}

async function remove({ id: _id }) {
  return model.deleteOne({ _id }).lean();
}

async function update({ id: _id, ...data }) {
  const result = await model
    .findOneAndUpdate({ _id }, data, { new: true })
    .lean();
  const { _id: id, ...res } = result;

  return { id, ...res };
}

module.exports = clientInfoDb;
