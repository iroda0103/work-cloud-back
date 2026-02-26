const { InvalidPropertyError } = require('../../shared/errors')

const VALID_TEMPLATES = ['ubuntu-base', 'python', 'nodejs', 'fullstack']

module.exports = function buildMakeWorkspace({ Id }) {
  return function makeWorkspace({
    id = Id.makeId(),
    user_id,
    name = 'Mening kompyuterim',
    template = 'ubuntu-base',
  } = {}) {
    if (!id) throw new InvalidPropertyError("Workspace id bo'lishi shart.")
    if (!user_id) throw new InvalidPropertyError("user_id bo'lishi shart.")

    const trimmedName = (name || '').trim()
    if (!trimmedName || trimmedName.length > 50) {
      throw new InvalidPropertyError("Workspace nomi 1-50 belgi bo'lishi shart.")
    }

    if (!VALID_TEMPLATES.includes(template)) {
      throw new InvalidPropertyError(
        `Template: ${VALID_TEMPLATES.join(' | ')} bo'lishi shart.`
      )
    }

    return Object.freeze({
      getId:       () => id,
      getUserId:   () => user_id,
      getName:     () => trimmedName,
      getTemplate: () => template,
    })
  }
}
