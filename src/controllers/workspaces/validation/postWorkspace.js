const Joi = require('joi')

exports.postWorkspaceSchema = {
  body: Joi.object({
    name:     Joi.string().trim().max(50).required(),
    template: Joi.string().valid('ubuntu-base', 'python', 'nodejs', 'fullstack').default('ubuntu-base'),
  }),
}
