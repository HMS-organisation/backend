const express = require("express")
const app = express()

const cors = require("cors")
app.use(express.json())
app.use(express.static('Image'))
const path=require('path')
app.use(express.static('Public'))
app.use(cors())
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 7000
app.listen(PORT, (error) => {
  if (error) {
    console.log(error.sqlMessage)
  } else {
    console.log("server connected")
  }
})




const { Rooms_routes } = require("./Routes/RoomsRoutes")
app.use("/", Rooms_routes)

const { Department_routes } = require("./Routes/DepartmentRoutes")
app.use("/", Department_routes)

const { Role_routes } = require("./Routes/RoleRoutes")
app.use("/", Role_routes)

const { Lab_routes } = require("./Routes/LabRoutes")
app.use("/", Lab_routes)

const { Test_routes } = require("./Routes/TestRoutes")
app.use("/", Test_routes)

const { Emp_routes } = require("./Routes/EmployeesRoutes")
app.use("/", Emp_routes)

const { Rolea_routes } = require("./Routes/RoleassignRoutes")
app.use("/", Rolea_routes)

const { Empp_routes } = require("./Routes/EmpprofileRoutes")
app.use("/", Empp_routes)

const { Patient_routes } = require("./Routes/PatientRoutes")
app.use("/", Patient_routes)

const { Treatment_routes } = require("./Routes/TreatmentRoutes")
app.use("/", Treatment_routes)

const { Pres_routes } = require("./Routes/PrescriptionRoutes")
app.use("/", Pres_routes)

const { Testr_routes } = require("./Routes/TestreportRoutes")

app.use("/", Testr_routes)
const { Login_routes } = require("./Routes/LoginRoutes")
app.use("/", Login_routes)
const { Report_routes } = require("./Routes/ReportRoutes")
app.use("/", Report_routes)
const { Invoice_routes } = require("./Routes/InvoiceRoutes")
app.use("/", Invoice_routes)
const { RazorpayRoutes } = require("./Routes/RazorRoutes")
app.use("/", RazorpayRoutes)

app.get('/api/getKey',(req,res)=>{

  res.status(200).json({key:process.env.RAZORPAY_API_KEY})
}
);