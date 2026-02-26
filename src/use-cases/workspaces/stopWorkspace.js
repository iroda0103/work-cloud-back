const { NotFoundError, ConflictError, ServiceUnavailableError } = require('../../shared/errors')

module.exports = function makeStopWorkspace({ workspaceDb, sessionDb, Docker }) {
  return async function stopWorkspace({ workspace_id, user_id }) {
    const ws = await workspaceDb.findById({ id: workspace_id })

    if (!ws || String(ws.user_id) !== String(user_id)) {
      throw new NotFoundError('Workspace topilmadi')
    }

    if (ws.status !== 'running') {
      throw new ConflictError("Workspace allaqachon to'xtatilgan")
    }

    try {
      await Docker.stop(ws.container.name)
    } catch (err) {
      throw new ServiceUnavailableError(`Docker xatosi: ${err.message}`)
    }

    const now = new Date()
    await workspaceDb.update({
      id:              workspace_id,
      status:          'stopped',
      last_stopped_at: now,
    })

    // Ochiq sessiyani yopish
    const openSession = await sessionDb.findOne({
      workspace_id,
      disconnected_at: null,
    })

    let duration_sec = null
    if (openSession) {
      duration_sec = Math.floor(
        (now - new Date(openSession.connected_at)) / 1000
      )
      await sessionDb.disconnect({
        id:              openSession.id,
        disconnected_at: now,
        duration_sec,
      })
    }

    return { status: 'stopped', duration_sec }
  }
}
