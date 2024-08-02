
const express = require('express')
const Empp_routes = express.Router()
const { Emppget, Empppost, Emppput, Emppdelete ,EmpgetPro} = require("../Controller/EmpprofileController")
const { upload } = require('../Upload');  
Empp_routes.get("/api/emppget", Emppget)  
Empp_routes.get("/api/EmpgetPro", EmpgetPro)  
Empp_routes.post("/api/empppost", upload.single('image'), Empppost)
Empp_routes.put("/api/empp", upload.single('image'),Emppput)
Empp_routes.delete("/api/emppdelete", Emppdelete)

 
module.exports = { Empp_routes }