const connection = require('../Model/Db_connection');
const jwt = require('jsonwebtoken');


let PatientLogin = async (req, res) => {
  const { pid, pname } = req.body;
  try {
    const sqlQuery = ` SELECT 
    p.pid, 
    p.pname, 
    p.gender, 
    p.mobile, 
    p.age, 
    p.symtoms, 
    p.city, 
    p.appoint,
    pr.pdate,
    pr.medicine,
    pr.dose,
    t.admit,
    t.treattime,
    e.empid, 
    e.empname,
    prf.mobile AS emp_mobile,  -- Adding employee mobile number from profile table
    prf.image AS emp_image,    -- Adding employee image from profile table
    rpt.report_id,
    rpt.report_date,
    rpt.report_type,
    rpt.summary
FROM 
    patient p
LEFT JOIN 
    prescription pr ON p.pid = pr.pid
LEFT JOIN 
    treatment t ON p.pid = t.pid
LEFT JOIN 
    employee e ON t.empid = e.empid
LEFT JOIN 
    profile prf ON e.empid = prf.empid  -- Joining profile table to get emp_mobile and emp_image
LEFT JOIN 
    report rpt ON p.pid = rpt.pid       -- Joining report table to get report details
WHERE  
    p.pid = $1 AND p.pname = $2;
`
    const { rows } = await connection.query(sqlQuery, [pid, pname]);

    if (rows.length > 0) {
      const patient = rows[0];
      const token = jwt.sign(
        { pid: patient.pid },
        "jwt_secret_key",
        { expiresIn: "1h" }
      );

      res.cookie('token', token, { httpOnly: true });
      return res.json({ loginStatus: true, token: token, patient });


    } else {
      return res.status(401).json({ loginStatus: false, error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in PatientLogin:", error);
    return res.status(500).json({ loginStatus: false, error: "Database query error" });
  }
};

let AdminLogin = async (req, res) => {
  const { admin_id ,password } = req.body;
  try {
    const sqlQuery = `select  from admin where admin_id =$1 and password =$2`;
    const { rows } = await connection.query(sqlQuery, [ admin_id , password]);

    if (rows.length > 0) {
      const admin = rows[0];
      const token = jwt.sign(
        { admin_id: admin.admin_id },
        "jwt_secret_key",
        { expiresIn: "1h" }
      );

      res.cookie('token', token, { httpOnly: true });
      return res.json({ loginStatus: true, token: token, admin });


    } else {
      return res.status(401).json({ loginStatus: false, error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in AdminLogin:", error);
    return res.status(500).json({ loginStatus: false, error: "Database query error" });
  }
};

module.exports = { PatientLogin ,AdminLogin}