const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        info: { type: String, required: true },
        count: { type: Number, required: true },
        price: { type: Number, required: true },
        type: { type: String, required: true },
        category: { type: String, required: true },//edibles,device
        photo: { type: String, required: true },
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


module.exports = mongoose.model("Product", schema);

// const body = {
//     brand: "apple",
//     count: "3",
//     info: "iPhone 15 Pro Max Ultra Best ",
//     name: "iPhone",
//     price: "1700",
//     type: "phone",
//     photo: {
//       lastModified: 1689776066645,
//       lastModifiedDate: "Wed Jul 19 2023 19: 14: 26 GMT +0500(Узбекистан, стандартное время)",
//       name: "photo.webp",
//       size: 11134,
//       type: "image/webp",
//       webkitRelativePath: "",
//     },
//   }