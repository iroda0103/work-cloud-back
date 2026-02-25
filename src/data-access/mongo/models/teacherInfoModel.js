const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, ref: 'User' },
    category: { type: Number, required: true },
    kun: { type: String, required: true },
    info: { type: String, required: true },
    gender: { type: String, required: true }
  },
  {
    toJSON: { virtuals: true },
    versionKey: false,
    timestamps: false
  }
);

schema.index({ first_name: 'text' })

module.exports = mongoose.model("TeacherInfo", schema);
