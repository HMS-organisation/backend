const express = require('express');
const connection = require('../Model/Db_connection');
const twilio = require('twilio');
const dotenv = require('dotenv')
dotenv.config()

//!---------------------------------GET-------------------------------//

const twilioClient = twilio(process.env.accountSid, process.env.authToken);
let Treatmentget = async (req, res) => {
  let sqlQuery = "select * from treatment";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};



//!----------------------------------POST-------------------------------//
const Treatmentpost = (req, res) => {
  const { pid, empid, admit, treattime } = req.body;
  if (!pid || !empid || !admit || !treattime) {
    return res.status(400).send('All fields (pid, empid, admit, treattime) are required');
  }

  const sqlQuery = `SELECT  e.empid,  e.empname,  COALESCE(d.dept_name, 'N/A') AS department  FROM   employee e LEFT JOIN  department d ON e.dept_id = d.dept_id  WHERE   e.empid = $1; `;

  connection.query(sqlQuery, [empid], (err, result) => {
    if (err) {
      console.error('Error fetching employee details:', err);
      return res.status(500).send('Error fetching employee details: ' + err.message);
    }
    if (result.rows.length === 0) {
      return res.status(404).send('No employee found with the given empid');
    }

    const { empname, department } = result.rows[0];

    const insertQuery = `INSERT INTO treatment (pid, empid, admit, treattime) VALUES ($1, $2, $3, $4)`;
    const values = [pid, empid, admit, treattime];

    connection.query(insertQuery, values, (err) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Error inserting data: ' + err.message);
      }
      else {
        twilioClient.messages.create({
          body: `Treatment started: Patient ID: ${pid}, Doctor: ${empname} (ID: ${empid}), Department: ${department}, Treatment date: ${admit}, Time: ${treattime}`,
          from: '+12513095614',
          to: '+919399771260'
        })
          .then(message => console.log('Treatment message sent:', message.sid, message.body))
          .catch(error => console.error('Error sending treatment message:', error));

        console.log('Data inserted successfully');
        res.status(200).send('Treatment data inserted successfully');
      }
    });
  });
};


//!----------------------------------PUT-------------------------------//



///////////////////////////////////////////////////////////////////////////
const Treatmentput = (req, res) => {
  const pid = req.query.pid;
  const { empid, admit, treattime } = req.body;
  console.log(req.body)
  if (!empid) {
    return res.status(400).send('emp id is required');
  }

  let sqlQuery = `
                                UPDATE treatment
                                SET empid = $1, admit = $2,treattime=$3
                                WHERE pid = $4
                              `;
  let values = [empid, admit, treattime, pid];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }
    res.send(`Data updated`);
  });
};




//!----------------------------------DELETE-------------------------------//



const Treatmentdelete = async (req, res) => {
  const pid = req.query.pid;
  try {
    await connection.query('DELETE FROM treatment WHERE pid = $1', [pid]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { Treatmentget, Treatmentpost, Treatmentput, Treatmentdelete }