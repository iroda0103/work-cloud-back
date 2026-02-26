module.exports = function makeListAllWorkspaces({ workspaceDb }) {
  return async function listAllWorkspaces({ page, sort } = {}) {
    const result = await workspaceDb.findAllPopulated({ page, sort })

    const running = result.data.filter((w) => w.status === 'running').length
    const stopped = result.data.filter((w) => w.status !== 'running').length

    return { running, stopped, workspaces: result.data, total: result.total }
  }
}
