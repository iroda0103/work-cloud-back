const { InvalidPropertyError } = require("../../shared/errors");

module.exports = function buildMakeChat({ Id }) {
    return function makeChat({
        id = Id.makeId(),
        chat_id = Id.makeId(),
        from,
        to='admin',
        text=null,
        status = 'unread',
        photo = null
    } = {}) {
        
        if (!(photo || text)) {
            throw new InvalidPropertyError(
                "Chatda yaroqli xabar bo'lishi shart."
            );
        }

        if (!from) {
            throw new InvalidPropertyError(
                "Chat kimdan ekanligi bo'lishi shart."
            );
        }

        if (!to) {
            throw new InvalidPropertyError(
                "Chat kimga ekanligi bo'lishi shart."
            );
        }

        if (!chat_id) {
            throw new InvalidPropertyError(
                "Chatda yaroqli chat_id bo'lishi shart."
            );
        }

        if (!['read', 'unread'].includes(status)) {
            throw new InvalidPropertyError(
                "Chatda yaroqli status bo'lishi shart."
            );
        }
        return Object.freeze({
            getId: () => id,
            getChatId: () => chat_id,
            getFrom: () => from,
            getTo: () => to,
            getText: () => text,
            getStatus: () => status,
            getPhoto: () => photo
        });


    };
};
