const express = require('express');
const Invoice_routes = express.Router();
const {Invoice,InvoicPos,InvoiceGet,Paymentget,AdPaymentget} =require('../Controller/Invoice');

Invoice_routes.get('/Invoice', Invoice)
Invoice_routes.get('/InvoiceGet', InvoiceGet)
Invoice_routes.post('/InvoicePost', InvoicPos)
Invoice_routes.get('/Paymentget', Paymentget)
Invoice_routes.get('/AdminPay', AdPaymentget)

module.exports = {Invoice_routes};