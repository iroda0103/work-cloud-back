const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    photo: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    versionKey: false,
    timestamps: false
  }
);


module.exports = mongoose.model("User", schema);
