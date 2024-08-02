const connection = require('../Model/Db_connection');
const EmployeesSchema = require('../Validators/EmployeesValidator');

//!---------------------------------GET-------------------------------//


let Empget = async (req, res) => {
  let sqlQuery = `SELECT 
    e.empid,
    e.empname,
    COALESCE(string_agg(DISTINCT r.role_name, ', '), 'N/A') AS role_name,
    COALESCE(d.dept_name, 'N/A') AS dept_name,
    COALESCE(e.email, 'N/A') AS email
FROM 
    employee e
LEFT JOIN 
    role_assign ra ON e.empid = ra.empid
LEFT JOIN 
    role r ON ra.role_id = r.role_id
LEFT JOIN 
    department d ON e.dept_id = d.dept_id
GROUP BY
    e.empid, e.empname, d.dept_name, e.email;


`;
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};
let Empdata = async (req, res) => {
  let sqlQuery = `SELECT e.empid, e.empname, STRING_AGG(DISTINCT r.role_name, ', ') AS roles
FROM employee e
JOIN role_assign ra ON e.empid = ra.empid
JOIN role r ON ra.role_id = r.role_id
GROUP BY e.empid, e.empname;



`;
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};


//!----------------------------------POST-------------------------------//

const Emppost = (req, res) => {
  const { error, value } = EmployeesSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { empid, empname,  email, password } = req.body;

  if (!empid || !empname ||  !email || !password) {
    return res.status(400).send('All fields (lab_id, lab_name, room_id) are required');
  }

  const sqlQuery = `
    INSERT INTO employee (empid, empname,email,password)
    VALUES ($1, $2, $3, $4)
  `;
  const values = [empid, empname, email, password];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data');
    }
    res.send({ success: true, message: 'lab added successfully' });
  });
};


//!----------------------------------PUT---------------------------------//



const Empput = (req, res) => {
  const empid = req.query.empid;

  let sqlQuery = `
                                UPDATE employee
                                SET empname=$1,  email=$2, password=$3 where empid=$4
                              `;
  let values = [
    req.body.empname,
    req.body.email,
    req.body.password,
  ];
  console.log(values)
  connection.query(sqlQuery, [...values, empid], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }
    console.log('Data updated successfully');
    res.send(`Data updated`);
  });

};



const Empdeps = (req, res) => {
  const empid = req.query.empid;
  console.log(empid)
  let sqlQuery = `
                                UPDATE employee
                                SET dept_id=$1 where empid=$2
                              `;
  let values = [
    req.body.dept_id,
  ];
  console.log(values)
  connection.query(sqlQuery, [...values, empid], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }
    console.log('Data updated successfully');
    res.send(`Data updated`);
  });

};

const Empdepsdel = (req, res) => {
  const empid = req.query.empid;
  let sqlQuery = `UPDATE employee SET dept_id = NULL WHERE empid = $1`;

  connection.query(sqlQuery, [empid], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }
    console.log('Data updated successfully');
    res.send('Data updated');
  });
};


//!----------------------------------DELETE-------------------------------//



const Empdelete = async (req, res) => {
  const empid = req.query.empid;
  try {
    await connection.query('DELETE FROM employee WHERE empid = $1 ', [empid]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', error });
  }
};


let DoctorGet = async (req, res) => {
  let sqlQuery = "select empid,empname from employee";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};
module.exports = { Empget, Emppost, Empput, Empdelete, Empdeps, Empdata, Empdepsdel ,DoctorGet}