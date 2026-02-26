const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    last_login_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.index({ username: 1 })
userSchema.index({ email: 1 })

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password_hash
    return ret
  },
})

module.exports = mongoose.model('User', userSchema)
