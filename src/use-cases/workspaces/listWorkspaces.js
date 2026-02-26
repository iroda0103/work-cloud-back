module.exports = function makeListWorkspaces({ workspaceDb }) {
  return async function listWorkspaces({ user_id }) {
    return workspaceDb.findByUserId({ user_id })
  }
}
