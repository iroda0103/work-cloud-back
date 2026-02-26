const makeSession = require('../../entities/session')
const { NotFoundError, ConflictError, ServiceUnavailableError } = require('../../shared/errors')

module.exports = function makeStartWorkspace({ workspaceDb, sessionDb, Docker }) {
  return async function startWorkspace({ workspace_id, user_id, username, ip_address, user_agent }) {
    const ws = await workspaceDb.findById({ id: workspace_id })

    if (!ws || String(ws.user_id) !== String(user_id)) {
      throw new NotFoundError('Workspace topilmadi')
    }

    if (ws.status === 'running') {
      throw new ConflictError('Workspace allaqachon ishlamoqda')
    }

    let containerId  = ws.container?.id   || null
    let containerName = ws.container?.name || null
    let port          = ws.container?.port  || null

    try {
      if (ws.status === 'not_created') {
        port = await findFreePort(workspaceDb)
        containerName = `wc_${username}_${String(workspace_id).slice(-8)}`
        const image = Docker.IMAGES[ws.template] || Docker.IMAGES['ubuntu-base']
        containerId = await Docker.createAndStart({
          name:   containerName,
          image,
          port,
          limits: ws.limits || { ram_mb: 1024, cpu_shares: 512 },
        })
      } else {
        // status === 'stopped'
        await Docker.start(containerName)
      }
    } catch (err) {
      throw new ServiceUnavailableError(`Docker xatosi: ${err.message}`)
    }

    const now = new Date()
    const updated = await workspaceDb.update({
      id:              workspace_id,
      status:          'running',
      container:       { id: containerId, name: containerName, port },
      last_started_at: now,
    })

    const session = makeSession({ workspace_id, user_id, ip_address, user_agent })
    await sessionDb.insert({
      id:           session.getId(),
      workspace_id: session.getWorkspaceId(),
      user_id:      session.getUserId(),
      ip_address:   session.getIpAddress(),
      user_agent:   session.getUserAgent(),
      connected_at: session.getConnectedAt(),
    })

    const host = process.env.SERVER_HOST || 'localhost'
    const vnc_url = `http://${host}:${port}/vnc.html?autoconnect=true&resize=scale`

    return { status: 'running', vnc_url, workspace: updated }
  }
}

async function findFreePort(workspaceDb) {
  const { data } = await workspaceDb.findAll({ filters: { status: 'running' } })
  const usedPorts = new Set(data.map((w) => w.container?.port).filter(Boolean))
  for (let port = 6901; port <= 7000; port++) {
    if (!usedPorts.has(port)) return port
  }
  throw new Error("Bo'sh port topilmadi (6901-7000)")
}
