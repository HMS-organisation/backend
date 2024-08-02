
const express = require('express')
const Report_routes = express.Router()
const { Reporget ,Reportpost,PatiReport,Reportdel,ReportUp,Addget} = require("../Controller/ReportController")

Report_routes.get("/api/Reporget", Reporget)
Report_routes.get("/api/addget", Addget)
Report_routes.get("/api/ViewReport", PatiReport)
Report_routes.post("/api/Reportpost", Reportpost)
Report_routes.delete("/api/reportdel", Reportdel)
Report_routes.put("/api/reportUp", ReportUp)

module.exports = { Report_routes }