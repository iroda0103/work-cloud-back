const { NotFoundError } = require('../../shared/errors')

module.exports = function makeListSessions({ workspaceDb, sessionDb }) {
  return async function listSessions({ workspace_id, user_id }) {
    const ws = await workspaceDb.findById({ id: workspace_id })

    if (!ws || String(ws.user_id) !== String(user_id)) {
      throw new NotFoundError('Workspace topilmadi')
    }

    const { data: sessions, total: total_sessions } = await sessionDb.findAll({
      filters:  { workspace_id },
      sort:     { by: 'connected_at', order: 'desc' },
    })

    const total_sec = sessions.reduce((acc, s) => acc + (s.duration_sec || 0), 0)
    const total_hours = Math.round((total_sec / 3600) * 10) / 10

    return { sessions, total_sessions, total_hours }
  }
}
