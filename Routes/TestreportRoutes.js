
const express = require('express')
const Testr_routes = express.Router()
const { Testrget, Testrpost, Testrput, Testrdelete } = require("../Controller/TestreportController")

Testr_routes.get("/api/testrget", Testrget)
Testr_routes.post("/api/testrpost", Testrpost)
Testr_routes.put("/api/testr/:patient_id", Testrput)
Testr_routes.delete("/api/testrdelete/:patient_id", Testrdelete)


module.exports = { Testr_routes }