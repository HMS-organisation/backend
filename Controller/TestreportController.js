const express = require('express');
const connection = require('../Model/Db_connection');


//!---------------------------------GET-------------------------------//


let Testrget = async (req, res) => {
  let sqlQuery = "select * from test_report";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};



//!----------------------------------POST-------------------------------//


const Testrpost = (req, res) => {
  const { patient_id, dept_id, test_id, result } = req.body;

  if (!patient_id || !dept_id || !test_id || !result) {
    return res.status(400).send('All fields (patient_id, dept_id, test_id, result ) are required');
  }


  if (!patient_id) {

    return res.status(400).send('patient_id is required');
  }


  insertLabData(patient_id, dept_id, test_id, result, res);
};

function insertLabData(patient_id, dept_id, test_id, result, res) {
  let sqlQuery = `
                              INSERT INTO test_report (patient_id, dept_id,
                                test_id, result)
                              VALUES ($1, $2, $3, $4)
                            `;
  let values = [patient_id, dept_id, test_id, result];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data: ' + err.message);
    }
    console.log('Data inserted successfully');
    res.send(`Data inserted`);
  });
}


//!----------------------------------PUT-------------------------------//



const Testrput = (req, res) => {
  const patient_id = req.params.patient_id;
  const { dept_id, test_id, result } = req.body;

  if (!patient_id) {
    return res.status(400).send('patient id is required');
  }

  let sqlQuery = `
                                UPDATE test_report
                                SET dept_id = $1,
                                test_id = $2,
                                result = $3
                                WHERE patient_id = $4
                              `;
  let values = [dept_id, test_id, result, patient_id];

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



const Testrdelete = async (req, res) => {
  const patient_id = req.params.patient_id;
  try {
    await connection.query('DELETE FROM test_report WHERE patient_id = $1', [patient_id]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { Testrget, Testrpost, Testrput, Testrdelete }