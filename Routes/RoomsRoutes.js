
const express = require('express')
const Rooms_routes = express.Router()
const { Roomsget, Roomspost, Roomsput, Roomsdelete } = require("../Controller/RoomsController")

Rooms_routes.get("/api/roomsget", Roomsget)
Rooms_routes.post("/api/roomspost", Roomspost)
Rooms_routes.put("/api/room", Roomsput)
Rooms_routes.delete("/api/roomsdelete", Roomsdelete)


module.exports = { Rooms_routes }