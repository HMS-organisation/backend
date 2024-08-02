const express = require('express')
const Emp_routes = express.Router()
const { Empget, Emppost, Empput, Empdelete ,Empdeps,Empdata,Empdepsdel,DoctorGet} = require("../Controller/EmployeesControllers")

Emp_routes.get("/api/empget", Empget)
Emp_routes.get("/api/empdata", Empdata)
Emp_routes.post("/api/emppost", Emppost)
Emp_routes.put("/api/emp", Empput)
Emp_routes.put("/api/empdep", Empdeps)
Emp_routes.put("/api/Empdepsdel", Empdepsdel)
Emp_routes.delete("/api/empdelete", Empdelete)
Emp_routes.get("/api/DoctorGet", DoctorGet)


module.exports = { Emp_routes }