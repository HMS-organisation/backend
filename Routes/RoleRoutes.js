
const express = require('express')
const Role_routes = express.Router()
const { Roleget, Rolepost, Roleput, Roledelete ,RoleAssign} = require("../Controller/RoleControllers")

Role_routes.get("/api/roleget", Roleget)
Role_routes.get("/api/roleassign", RoleAssign)
Role_routes.post("/api/rolepost", Rolepost)
Role_routes.put("/api/role", Roleput)
Role_routes.delete("/api/roledelete", Roledelete)


module.exports = { Role_routes }