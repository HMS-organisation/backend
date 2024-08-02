const express = require('express');
const connection = require('../Model/Db_connection');


//!---------------------------------GET-------------------------------//


let Testget = async (req, res) => {
  let sqlQuery = "select * from testrate";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};
let Tesget = async (req, res) => {
  let sqlQuery = "select testname ,testprice from testrate";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};



//!----------------------------------POST-------------------------------//

const Testpost = (req, res) => {
 const { lab_id,test_id, testname, testprice,updatation } = req.body;

  if (!lab_id || !test_id ||!testname ||!testprice ||!updatation) {
    return res.status(400).send('All fields (test_id, lab_id, test_name, price) are required');
  }

  const sqlQuery = `
    INSERT INTO testrate (lab_id,test_id, testname, testprice,updatation)
    VALUES ($1, $2, $3, $4,$5)
  `;
  const values = [lab_id,test_id, testname, testprice,updatation];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data');
    }
    console.log('Data inserted successfully');
    res.send({ success: true, message: 'lab added successfully' });
  });
};


//!----------------------------------PUT-------------------------------//



const Testput = (req, res) => {
  const test_id = req.query.test_id;
  const {lab_id, testname, testprice,updatation } = req.body;

  if (!test_id) {
    return res.status(400).send('test id is required');
  }

  let sqlQuery = `
                                UPDATE testrate
                                SET lab_id = $1, testname = $2, testprice = $3,updatation=$4
                                WHERE test_id = $5
                              `;
  let values = [lab_id,  testname, testprice,updatation , test_id];

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



const Testdelete = async (req, res) => {
  const test_id = req.query.test_id;
  try {
    await connection.query('DELETE FROM testrate WHERE test_id = $1', [test_id]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { Testget, Testpost, Testput, Testdelete ,Tesget}