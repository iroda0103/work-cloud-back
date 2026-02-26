const { NotFoundError } = require('../../shared/errors')

module.exports = function makeShowWorkspace({ workspaceDb }) {
  return async function showWorkspace({ id, user_id }) {
    const ws = await workspaceDb.findById({ id })

    if (!ws || String(ws.user_id) !== String(user_id)) {
      throw new NotFoundError('Workspace topilmadi')
    }

    return ws
  }
}
