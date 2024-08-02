const Joi = require('joi');

const RoleSchema = Joi.object({
  role_id: Joi.number().integer().min(1).max(100).required(),
  role_name: Joi.string().min(1).max(15).required()
});

module.exports = RoleSchema;