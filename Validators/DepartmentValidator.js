const Joi = require('joi');

const DepartmentSchema = Joi.object({
  dept_id: Joi.number().integer().min(1).max(100).required(),
  dept_name: Joi.string().min(1).max(10).required(),
  room_no: Joi.number().integer().min(1).max(100).required(),
  dept_est_date:Joi.date().required()
});

module.exports = DepartmentSchema;