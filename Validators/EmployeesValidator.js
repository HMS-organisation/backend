const Joi = require('joi');

const EmployeesSchema = Joi.object({
  empid: Joi.string().min(1).max(15).required(),
  empname: Joi.string().min(1).max(100).required(),
  email: Joi.string().min(1).max(20).required(),
  password: Joi.string()
    .min(6)
    .max(20)
    .required(),
  
});

module.exports = EmployeesSchema;