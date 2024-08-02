
const express = require('express')
const Patient_routes = express.Router()
const { Patientget, Patientpost, Patientput, Patientdelete,Amditget,Appointmentpost } = require("../Controller/PatientController")

Patient_routes.get("/api/patientget", Patientget)
Patient_routes.get("/api/Amditget", Amditget)
Patient_routes.post("/api/patientpost", Patientpost)
Patient_routes.put("/api/patient", Patientput)
Patient_routes.delete("/api/patientdelete", Patientdelete)
Patient_routes.post("/api/Appointmentpost", Appointmentpost)

module.exports = { Patient_routes }