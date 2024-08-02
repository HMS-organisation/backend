
const express = require('express')
const Test_routes = express.Router()
const { Testget, Testpost, Testput, Testdelete,Tesget } = require("../Controller/TestController")

Test_routes.get("/api/testget", Testget)
Test_routes.post("/api/testpost", Testpost)
Test_routes.put("/api/test", Testput)
Test_routes.delete("/api/testdelete", Testdelete)
Test_routes.get("/Tesget", Tesget)


module.exports = { Test_routes }