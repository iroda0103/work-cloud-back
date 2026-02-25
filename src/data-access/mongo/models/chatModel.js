const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        chat_id: { type: String, required: true },
        from: { type: String, required: true, ref: 'User' },
        to: { type: String, required: true, ref: 'User' },
        text: { type: String },
        status: { type: String, default: "unread" },
        photo: { type: String, default: null }
    },
    {
        toJSON: { virtuals: true },
        versionKey: false,
        timestamps: {
            createdAt: "created_at",
            updatedAt: false
        }
    }
);


module.exports = mongoose.model("Chat", schema);
