const { InvalidPropertyError } = require('../../shared/errors')

module.exports = function buildMakeSession({ Id }) {
  return function makeSession({
    id = Id.makeId(),
    workspace_id,
    user_id,
    ip_address = null,
    user_agent = null,
    connected_at = new Date(),
  } = {}) {
    if (!workspace_id) throw new InvalidPropertyError("workspace_id bo'lishi shart.")
    if (!user_id)      throw new InvalidPropertyError("user_id bo'lishi shart.")

    return Object.freeze({
      getId:          () => id,
      getWorkspaceId: () => workspace_id,
      getUserId:      () => user_id,
      getIpAddress:   () => ip_address,
      getUserAgent:   () => user_agent,
      getConnectedAt: () => connected_at,
    })
  }
}
