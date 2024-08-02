const Joi = require('joi');

const RoomsSchema = Joi.object({
  room_no: Joi.number().integer().min(1).max(100).required(),
  room_name: Joi.string().min(1).max(10).required()
});

module.exports = RoomsSchema;