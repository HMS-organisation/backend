const express = require('express');
const connection = require('../Model/Db_connection');


//!---------------------------------GET-------------------------------//


let Roleaget = async (req, res) => {
  let sqlQuery = "select * from role_assign";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};



//!----------------------------------POST-------------------------------//



const Roleapost = (req, res) => {

  const { empid, role_id } = req.body;


  if (!empid || !role_id) {
    return res.status(400).send('All fields (emp_id, role_id) are required');
  }

  let sqlQuery = `
    INSERT INTO role_assign (empid, role_id)
    VALUES ($1, $2)
  `;
  let values = [empid, role_id];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data: ' + err.message);
    }
    console.log('Data inserted successfully');
    res.send(`Data inserted`);
  });
};

const Assrole = (req, res) => {
  const empid = req.body.empid
  const { role_id } = req.body;
  console.log(req.body)
  let sqlQuery = `
    INSERT INTO role_assign (empid, role_id)
    VALUES ($1, $2)
  `;
  let values = [empid, role_id];

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



const Roleaput = (req, res) => {
  const empid = req.query.empid;
  const { role_id } = req.body;

  if (!role_id) {
    return res.status(400).send('Role id is required');
  }

  let sqlQuery = `
      UPDATE role_assign 
      SET role_id = $1
      WHERE empid = $2
    `;
  let values = [role_id, empid];

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



const Roleadelete = async (req, res) => {
 const {empid,role_id}=req.body
  try {
    await connection.query('DELETE FROM role_assign WHERE empid = $1 AND role_id=$2 ', [empid,role_id]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = { Roleaget, Roleapost, Roleaput, Roleadelete,Assrole }