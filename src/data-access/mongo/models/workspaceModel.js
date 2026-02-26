const mongoose = require('mongoose')
const { Schema } = mongoose

const workspaceSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      default: 'Mening kompyuterim',
    },
    template: {
      type: String,
      enum: ['ubuntu-base', 'python', 'nodejs', 'fullstack'],
      default: 'ubuntu-base',
    },
    container: {
      id:   { type: String, default: null },
      name: { type: String, default: null },
      port: { type: Number, default: null },
    },
    status: {
      type: String,
      enum: ['not_created', 'starting', 'running', 'stopping', 'stopped', 'error'],
      default: 'not_created',
    },
    limits: {
      ram_mb:     { type: Number, default: 1024 },
      cpu_shares: { type: Number, default: 512  },
      disk_mb:    { type: Number, default: 5120 },
    },
    last_started_at: { type: Date, default: null },
    last_stopped_at: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
)

workspaceSchema.index({ user_id: 1 })
workspaceSchema.index({ status: 1 })
workspaceSchema.index({ 'container.name': 1 }, { sparse: true })

workspaceSchema.virtual('vnc_url').get(function () {
  if (this.status !== 'running' || !this.container.port) return null
  const host = process.env.SERVER_HOST || 'localhost'
  return `http://${host}:${this.container.port}/vnc.html?autoconnect=true&resize=scale`
})

workspaceSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Workspace', workspaceSchema)
