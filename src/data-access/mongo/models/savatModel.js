const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        user_id: { type: String, required: true, ref: 'ClientInfo' },
        total_price: { type: Number, required: true },
        product_id: { type: String, required: true, ref: 'Product' },
        quantity: { type: Number, required: true }
    },
    {
        toJSON: { virtuals: true },
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

module.exports = mongoose.model("Savat", schema);
