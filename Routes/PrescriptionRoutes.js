
const express = require('express')
const Pres_routes = express.Router()
const { Presget, Prespost, Presput, Presdelete,PresPatient } = require("../Controller/PrescriptionController")

Pres_routes.get("/api/presget", Presget)
Pres_routes.post("/api/prespost", Prespost)
Pres_routes.put("/api/pres", Presput)
Pres_routes.delete("/api/presdelete", Presdelete)
Pres_routes.get("/api/PresPatient", PresPatient)

module.exports = { Pres_routes }