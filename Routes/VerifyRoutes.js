const express = require('express');
const { verifyToken } = require('../Controller/Verify');

const Verify_routes = express.Router();

Verify_routes.post("/verify", verifyToken);

module.exports = { Verify_routes };
