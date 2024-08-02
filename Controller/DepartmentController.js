const express = require('express');
const connection = require('../Model/Db_connection');
const Joi = require('joi');
const DepartmentSchema = require('../Validators/DepartmentValidator');

//!---------------------------------GET-------------------------------//

let Departmentget = async (req, res) => {
  let sqlQuery = "select * from department";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};
let DepAssign = async (req, res) => {
  const dept_name=req.query.dept_name;
  let sqlQuery = "select dept_id from department where dept_name=$1";
  connection.query(sqlQuery, [dept_name],function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};
//!----------------------------------POST-------------------------------//
const Departmentpost = (req, res) => {
  const { error, value } = DepartmentSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { dept_id, dept_name,room_no,dept_est_date } = req.body;

  if (!dept_id || !room_no || !dept_name || !dept_est_date) {
    return res.status(400).send('All fields (dept_id, dept_name) are required');
  }

  const sqlQuery = `
    INSERT INTO department (dept_id, dept_name,room_no,dept_est_date)
    VALUES ($1, $2,$3,$4)
  `;
  const values = [dept_id, dept_name,room_no,dept_est_date];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data');
    }
    console.log('Data inserted successfully');
    res.send({ success: true, message: 'Department added successfully' });
  });
};


//!----------------------------------PUT-------------------------------//

const Departmentput = (req, res) => {
  
  
  const { error, value } = DepartmentSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const {  dept_name,room_no,dept_est_date  } = req.body;
  const dept_id = req.query.dept_id;
  if (!dept_name) {
    return res.status(400).send('dept name is required');
  }

  let sqlQuery = `
    UPDATE department 
    SET dept_name = $1,
     room_no = $2,
    dept_est_date= $3

    WHERE dept_id = $4
  `;
  let values = [dept_name,room_no, dept_est_date,dept_id];

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

const Departmentdelete = async (req, res) => {
  const dept_id = req.query.dept_id;
  try {
    await connection.query('DELETE FROM department WHERE dept_id = $1', [dept_id]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { Departmentget, Departmentpost, Departmentput, Departmentdelete ,DepAssign };
