
const express = require('express')
const Treatment_routes = express.Router()
const { Treatmentget, Treatmentpost, Treatmentput, Treatmentdelete } = require("../Controller/TreatmentController")

Treatment_routes.get("/api/treatmentget", Treatmentget)
Treatment_routes.post("/api/treatmentpost", Treatmentpost)
Treatment_routes.put("/api/treatment", Treatmentput)
Treatment_routes.delete("/api/treatdel", Treatmentdelete)


module.exports = { Treatment_routes }