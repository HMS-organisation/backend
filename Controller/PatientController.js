const express = require('express');
const connection = require('../Model/Db_connection');


//!---------------------------------GET-------------------------------//


let Patientget = async (req, res) => {
  let sqlQuery = `SELECT
    DISTINCT
    p.pid ,
    p.pname ,
    p.gender,
    p.mobile,
    p.age,
    p.symtoms,
    p.city,
    p.appoint,
    COALESCE(e.empname, 'N/A') AS empname,
    t.admit AS treatment
FROM
    patient p
LEFT JOIN
    treatment t ON p.pid = t.pid
LEFT JOIN
    employee e ON t.empid = e.empid;
`;
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};



let Amditget = async (req, res) => {
  let sqlQuery = " select * from patient order by appoint desc limit 10;";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};

// !----------------------------------POST-------------------------------//



const Patientpost = (req, res) => {
  const { pid, pname, gender, mobile, age, symtoms, city, appoint } = req.body;

  if (!pid || !pname || !gender || !mobile || !age || !symtoms || !city || !appoint) {
    return res.status(400).send('All fields (patient_id, patient_name, patient_contact, patient_age, gender) are required');
  }


  if (!pid) {

    return res.status(400).send('patient id is required');
  }


  insertLabData(pid, pname, gender, mobile, age, symtoms, city, appoint, res);
};

function insertLabData(pid, pname, gender, mobile, age, symtoms, city, appoint, res) {
  let sqlQuery = `
                              INSERT INTO patient (pid, pname, gender, mobile, age, symtoms,city,appoint)
                              VALUES ($1, $2, $3, $4, $5,$6,$7,$8)
                            `;
  let values = [pid, pname, gender, mobile, age, symtoms, city, appoint];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log('posted')
      res.send(`${result.rows} data posted`);
    }
  });
}
//!----------------------------------PUT-------------------------------//


const Patientput = (req, res) => {
  const pid = req.query.pid;
  const { pname, gender, mobile, age, symtoms, city, appoint } = req.body;


  if (!pname) {
    return res.status(400).send('Patient name is required');
  }

  let sqlQuery = `
    UPDATE patient
    SET pname = $1, gender = $2, mobile = $3, age = $4, symtoms = $5, city = $6, appoint = $7
    WHERE pid = $8
  `;
  let values = [pname, gender, mobile, age, symtoms, city, appoint, pid];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }

    if (result.rowCount === 0) {
      return res.status(404).send('Patient not found');
    }
    res.send('Data updated successfully');
  });
};



//!----------------------------------DELETE-------------------------------//



const Patientdelete = async (req, res) => {
  const pid = req.query.pid;
  try {
    await connection.query('DELETE FROM patient WHERE pid = $1', [pid]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


let Appointmentpost = async (req, res) => {
  let appoint = new Date().toLocaleDateString();
  let admittime = new Date().toLocaleTimeString();
  const { pname, gender, mobile, age, city, symtoms } = req.body;
  const pid = req.body.pname + req.body.age
  let sqlQuery = `INSERT INTO patient (pid, pname, gender, mobile, age,  city,symtoms,appoint) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)`;
  connection.query(sqlQuery, [pid, pname, gender, mobile, age, city, symtoms, appoint], function (err, result) {
    if (err) {
      console.log(err)
      res.status(500).send(err.sqlMessage);
    } else {
      console.log('Inserted')
      res.send(result.rows);
    }
  });
};

module.exports = { Patientget, Patientpost, Patientput, Patientdelete, Amditget, Appointmentpost }