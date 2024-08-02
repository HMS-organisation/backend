const Joi = require('joi');

const LabSchema = Joi.object({
  lab_id: Joi.number().integer().min(1).max(100).optional(),
  lab_name: Joi.string().min(1).max(10).required(),
  room_no: Joi.number().integer().min(1).max(100).required()
});

module.exports = LabSchema;