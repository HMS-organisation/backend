
const express = require('express')
const Login_routes = express.Router()
const {PatientLogin,AdminLogin} = require('../Controller/Login')

Login_routes.post("/login", PatientLogin)
Login_routes.post("/Adminlogin", AdminLogin)


module.exports = { Login_routes }