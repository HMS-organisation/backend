const express = require('express');
const { checkout, paymentVerification } = require("../Controller/Razorpay");

const RazorpayRoutes = express.Router();

RazorpayRoutes.post('/checkout', checkout);
RazorpayRoutes.post('/paymentVerification', paymentVerification);

module.exports = { RazorpayRoutes };
