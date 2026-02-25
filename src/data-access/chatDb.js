const model = require("./mongo/models/chatModel");
const userModel = require("./mongo/models/userModel")

const chatDb = Object.freeze({
  insert,
  findAll,
  findById,
  findOne,
  remove,
  update
});

async function insert({ id: _id, ...info }) {
  if (info.to == 'admin') {
    const result_1 = await userModel.find({ role: 'admin' })
    const data = result_1.map(e => {
      return { to: e._id, ...info }
    })
    console.log(data);
  }
  else {
    data = { _id, ...info }
  }
  const result = await model.create(data);

  return {id:_id,...info};
}


async function findAll({ filters, q, page, sort }) {
  const filter = { ...filters };

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

  const result = await dbQuery.lean();

  const res = result.map((user) => {
    const { _id: id, ...info } = user;
    return { id, ...info };
  });

  return { data: res, total };
}

async function findById({ id: _id, user }) {
  // const result = await model
  //   .find({ chat_id: _id }).lean()



  // const result = await model.aggregate([
  //   {
  //     $match: {
  //       created_at: {
  //         $gte: new Date("2023-09-29T00:00:00Z"),
  //         $lt: new Date("2023-09-30T00:00:00Z")
  //       }
  //     }
  //   },
  //   {
  //     $group: {
  //       _id: "$chat_id",
  //       messages: {
  //         $push: {
  // id: "$id",
  // chat_id: "$chat_id",
  // from: "$from",
  // to: "$to",
  // text: "$text",
  // status: "$status",
  // created_at: "$created_at",
  // me: "$me"
  //         }
  //       }
  //     }
  //   }
  // ]);


  //==============
  const result = await model.aggregate([
    { $match: { chat_id: _id } }, // Match the desired chat_id
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } }, // Group by the date part of created_at field
        messages: {
          $push: {
            id: "$id",
            chat_id: "$chat_id",
            from: "$from",
            to: "$to",
            text: "$text",
            status: "$status",
            photo: "$photo",
            created_at: "$created_at"
          }
        } // Push the whole document into the messages array
      }
    },
    { $sort: { '_id': 1 } } // Sort the groups by date in ascending order
  ])
  console.log(user.id);
  if (!result) {
    return null;
  }

  const res = result.map((chats) => {
    let { _id: id, messages } = chats;
    messages = messages.map(chat => {
      chat.me = false
      console.log(user.id == chat.from, user.id, chat.from);
      if (user.id == chat.from) {
        chat.me = true
      }

      return chat;
    })
    return { _id: id, messages }
  });
  console.log(res);
  return result;
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

module.exports = chatDb;
