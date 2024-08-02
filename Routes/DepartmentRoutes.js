
const express = require('express')
const Department_routes = express.Router()
const { Departmentget, Departmentpost, Departmentput, Departmentdelete,DepAssign } = require("../Controller/DepartmentController")

Department_routes.get("/api/departmentget", Departmentget)
Department_routes.get("/api/depassign", DepAssign)
Department_routes.post("/api/departmentpost", Departmentpost)
Department_routes.put("/api/department", Departmentput)
Department_routes.delete("/api/departmentdelete", Departmentdelete)


module.exports = { Department_routes }