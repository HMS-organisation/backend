
const express = require('express')
const Lab_routes = express.Router()
const { Labget, Labpost, Labput, Labdelete } = require("../Controller/LabController")

Lab_routes.get("/api/labget", Labget)
Lab_routes.post("/api/labpost", Labpost)
Lab_routes.put("/api/lab", Labput)
Lab_routes.delete("/api/labdelete", Labdelete)


module.exports = { Lab_routes }