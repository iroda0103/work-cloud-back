const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/chatDb')} deps.chatDb
 */
module.exports = function makeShowChat({ chatDb }) {
  return async function showChat(filter) {
    const chatInfo = await chatDb.findById(filter);
    const chatInfoOne = await chatDb.findOne({ chat_id: filter.id });

    // if (!((filter.user.id == chatInfoOne?.from) || (filter.user.id == chatInfoOne?.to))) {
    //   throw new NotFoundError("Chat topilmadi");
    // }

    if (!chatInfo) {
      throw new NotFoundError("Chat topilmadi");
    }

    return { data: chatInfo };
  };
};
