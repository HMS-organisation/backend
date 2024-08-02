
const express = require('express')
const Rolea_routes = express.Router()
const { Roleaget, Roleapost, Roleaput, Roleadelete,Assrole } = require("../Controller/RoleassignController")

Rolea_routes.get("/api/roleaget", Roleaget)
Rolea_routes.post("/api/roleapost", Roleapost)
Rolea_routes.post("/api/assrole", Assrole)
Rolea_routes.put("/api/rolea", Roleaput)
Rolea_routes.delete("/api/roleadelete", Roleadelete)


module.exports = { Rolea_routes }