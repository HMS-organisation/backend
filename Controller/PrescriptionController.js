const express = require('express');
const connection = require('../Model/Db_connection');


//!---------------------------------GET-------------------------------//


let Presget = async (req, res) => {
  let sqlQuery = "select * from prescription";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};  

let PresPatient= async (req, res) => {
  let pid = req.query.pid;
  let sqlQuery = `select * from prescription where pid=$1`;
  connection.query(sqlQuery,[pid], function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};  

//  ....................................................

const Presput = (req, res) => {
  const pid = req.query.pid;
  const pdate= new Date().toLocaleDateString();
  const {    medicine   ,dose , empid,frequency} = req.body;
  if (!empid) {
    return res.status(400).send('department id is required');
  }

  let sqlQuery = `
                                UPDATE prescription
                                SET pdate = $1,
                                dose = $2,
                                empid = $3,
                                frequency = $4
                                WHERE pid = $5 AND medicine = $6
                              `;
  let values = [pdate    , dose , empid,frequency,pid,medicine];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }
    console.log('Data updated successfully');
    res.send(`Data updated`);
  });
};




//!----------------------------------DELETE-------------------------------//



const Presdelete = async (req, res) => {
  const pid = req.query.pid;
  const medicine = req.query.medicine;
  
  try {
    await connection.query('DELETE FROM prescription WHERE pid = $1 AND medicine=$2', [pid,medicine]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const Prespost = async (req, res) => {
  const { pid, empid, prescriptions } = req.body;
  const pdate = new Date().toISOString().slice(0, 10); 
  if (!pid || !empid || !prescriptions || !Array.isArray(prescriptions) || prescriptions.length === 0) {
    return res.status(400).send('All fields (patient_id, empid, and prescriptions array) are required');
  }
  try {
    for (const prescription of prescriptions) {
      const { medicine, dose, frequency } = prescription;
      if (!medicine || !dose || !frequency) {
        return res.status(400).send('Each prescription must include medicine, dose, and frequency');
      }

      await insertLabData(pid, pdate, medicine, dose, empid, frequency);
    }

    res.send('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Error inserting data: ' + err.message);
  }
};

const insertLabData = async (pid, pdate, medicine, dose, empid, frequency) => {
  const sqlQuery = `
    INSERT INTO prescription (pid, pdate, medicine, dose, empid, frequency)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  const values = [pid, pdate, medicine, dose, empid, frequency];

  try {
    await connection.query(sqlQuery, values);
  } catch (err) {
    throw new Error('Error inserting data: ' + err.message);
  }
};




module.exports = { Presget, Prespost, Presput, Presdelete ,PresPatient}