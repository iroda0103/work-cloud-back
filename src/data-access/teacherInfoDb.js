const model = require("./mongo/models/teacherInfoModel");
const userModel = require("./mongo/models/userModel");
const clientModel = require("./mongo/models/clientInfoModel");

const teacherInfoDb = Object.freeze({
  insert,
  findAll,
  findById,
  findOne,
  remove,
  update
});

async function insert({ id: _id, user_id, ...infoTeacher }) {
  const { category, info, gender, kun, ...userInfo } = infoTeacher
  const resultUser = await userModel.create({ _id: user_id, ...userInfo });
  const result = await model.create({ category, info, gender, kun, user_id })
  const { _id: id, res } = result;
  return { id, ...infoTeacher };
}


// if (q) {
//   filter.$or = [
//     { first_name: { $regex: `.*${q}.*`, $options: "i" } },
//     { last_name: { $regex: `.*${q}.*`, $options: "i" } },
//     { username: { $regex: `.*${q}.*`, $options: "i" } }
//   ];l
// }
async function findAll({ q, page, sort }) {
  let filter = {};

  if (q) {
    filter = { first_name: { $regex: `.*${q}.*`, $options: "i" } }
  }


  let dbQuery = model.find({});

  let total = await dbQuery.clone().count().exec();

  if (page) {
    dbQuery.limit(page.limit).skip(page.offset);
  }

  if (sort) {
    dbQuery.sort({ [sort.by]: sort.order == "asc" ? 1 : -1 });
  }

  let result = await dbQuery.lean()
    .populate({
      path: "user_id",
      select: "-password -_id",
      match: filter
    }).select('-password').lean();

  if (q) {
    result = result.filter(elem => elem.user_id)
  }
  const res = result.map((user) => {
    const { _id: id, user_id, ...info } = user;
    return { id, ...user_id, ...info };
  });

  return { data: res, total };
}


// async function findAll({ q, page, sort = { by: 'created_at', order: 'desc' } }) {
//   const filters = {};

//   if (q) {
//     filters.email = { $regex: new RegExp(q, "i") };
//     // filters.last_name = { $regex: new RegExp(q, "i") };
//   }

//   const total = (await model.find({ ...filters })).length;


//   const result = await model.find({})
//     .populate([{
//       path: 'user_id',
//       select: '-password',
//       match: filters
//     }])
//     .skip(page.offset)
//     .limit(page.limit)
//     .sort({ [sort.by]: sort.order });


//   return { data: result, total, pageInfo: { ...page } };
// }
async function findById({ id: _id }) {
  const result = await model
    .findById({ _id }).populate({ path: "user_id", select: "-password -_id" }).lean();

  if (!result) {
    return null;
  }

  const { _id: id, user_id, ...info } = result;

  return { id, ...user_id, ...info };
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
  const deleteTeacher = await model.findById({ _id }).lean()
  const deleteUser = await model.deleteOne({ _id: deleteTeacher.user_id }).lean()
  const updateClient = await clientModel.updateOne({ teacher_id: deleteTeacher._id }, { teacher_id: null }, { new: true }).lean()

  console.log(deleteTeacher, deleteUser, updateClient);
  return model.deleteOne({ _id }).lean();
}

async function update({ id: _id, user_id, ...infoTeacher }) {
  const { category, info, gender, kun, ...userInfo } = infoTeacher
  // const resultUser = await userModel.findOneAndUpdate({ _id: user_id }, {first_name:"o'xshadi" }, { new: true })
  const a=await userModel.findOne({email:userInfo.email})
  console.log(a,user_id,infoTeacher);
  // const result = await model
  //   .findOneAndUpdate({ _id }, { category, info, gender, kun, user_id:resultUser._id }, { new: true })
  //   .lean();
  // const { _id: id, res } = result;
  return { id:_id, ...infoTeacher };
}



module.exports = teacherInfoDb;
