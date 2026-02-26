const mongoose = require('mongoose')
const { Schema } = mongoose

const sessionSchema = new Schema(
  {
    workspace_id: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ip_address:      { type: String, default: null },
    user_agent:      { type: String, default: null },
    connected_at:    { type: Date, default: Date.now },
    disconnected_at: { type: Date, default: null },
    duration_sec:    { type: Number, default: null },
  },
  {
    timestamps: false,
  }
)

sessionSchema.index({ workspace_id: 1 })
sessionSchema.index({ user_id: 1 })
sessionSchema.index({ connected_at: -1 })
// TTL — 30 kundan eski sessiyalar avtomatik o'chadi
sessionSchema.index({ connected_at: 1 }, { expireAfterSeconds: 2592000 })

module.exports = mongoose.model('Session', sessionSchema)
