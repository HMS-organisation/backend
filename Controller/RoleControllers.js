const express = require('express');
const connection = require('../Model/Db_connection');
const Joi = require('joi');
const RoleSchema = require('../Validators/RoleValidator');

//!---------------------------------GET-------------------------------//


let Roleget = async (req, res) => {
  let sqlQuery = "select * from role";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};
let RoleAssign = async (req, res) => {
  const role_name=req.query.role_name;
  let sqlQuery = "select role_id from role where role_name=$1";
  connection.query(sqlQuery, [role_name],function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};



//!----------------------------------POST-------------------------------//



const Rolepost = (req, res) => {
  const { error, value } = RoleSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { role_id, role_name } = req.body;

  if (!role_id || !role_name) {
    return res.status(400).send('All fields (role_id, role_name) are required');
  }

  const sqlQuery = `
    INSERT INTO role (role_id, role_name)
    VALUES ($1, $2)
  `;
  const values = [role_id, role_name];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data');
    }
    console.log('Data inserted successfully');
    res.send({ success: true, message: 'Role added successfully' });
  });
};


//!----------------------------------PUT-------------------------------//



const Roleput = (req, res) => {
  const { error, value } = RoleSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const role_id = req.query.role_id;
  const { role_name } = req.body;

  if (!role_name) {
    return res.status(400).send('Role name is required');
  }

  let sqlQuery = `
    UPDATE role 
    SET role_name = $1
    WHERE role_id = $2
  `;
  let values = [role_name, role_id];

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



const Roledelete = async (req, res) => {
  const role_id = req.query.role_id;
  try {
    await connection.query('DELETE FROM role WHERE role_id = $1', [role_id]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = { Roleget, Rolepost, Roleput, Roledelete,RoleAssign }
