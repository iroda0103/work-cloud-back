const makeWorkspace = require('../../entities/workspace')
const { ConflictError } = require('../../shared/errors')

module.exports = function makeCreateWorkspace({ workspaceDb }) {
  return async function createWorkspace({ user_id, name, template }) {
    const existing = await workspaceDb.findAll({ filters: { user_id, name: name?.trim() } })
    if (existing.total > 0) {
      throw new ConflictError('Ushbu nomli workspace allaqachon mavjud')
    }

    const ws = makeWorkspace({ user_id, name, template })

    return workspaceDb.insert({
      id:       ws.getId(),
      user_id:  ws.getUserId(),
      name:     ws.getName(),
      template: ws.getTemplate(),
    })
  }
}
