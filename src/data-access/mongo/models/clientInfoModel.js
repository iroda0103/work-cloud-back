const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user_id: { type: String, required: true ,ref:'User'},
    teacher_id: { type: String, default:null,ref:'TeacherInfo' },
    service: { type: Number, required: true},
  },
  {
    toJSON: { virtuals: true },
    versionKey: false,
    timestamps: false
  }
);


module.exports = mongoose.model("ClientInfo", schema);
