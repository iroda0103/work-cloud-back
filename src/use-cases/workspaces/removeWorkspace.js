const { NotFoundError, ConflictError } = require('../../shared/errors')

module.exports = function makeRemoveWorkspace({ workspaceDb, Docker }) {
  return async function removeWorkspace({ id, user_id }) {
    const ws = await workspaceDb.findById({ id })

    if (!ws || String(ws.user_id) !== String(user_id)) {
      throw new NotFoundError('Workspace topilmadi')
    }

    if (ws.status === 'running') {
      throw new ConflictError("Avval workspace ni to'xtating")
    }

    if (ws.container.name) {
      try {
        await Docker.remove(ws.container.name)
      } catch {
        // Container allaqachon yo'q bo'lishi mumkin
      }
    }

    await workspaceDb.remove({ id })
    return { message: "Workspace o'chirildi" }
  }
}
