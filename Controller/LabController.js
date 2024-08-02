const express = require('express');
const connection = require('../Model/Db_connection');
const Joi = require('joi');
const LabSchema = require('../Validators/LabValidator');

//!---------------------------------GET-------------------------------//


let Labget = async (req, res) => {
  let sqlQuery = "select * from labs";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};



//!----------------------------------POST-------------------------------//

const Labpost = (req, res) => {
  const { error, value } = LabSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { lab_id, lab_name , room_no } = req.body;

  if (!lab_id || !lab_name ||!room_no ){
    return res.status(400).send('All fields (lab_id, lab_name, room_no) are required');
  }

  const sqlQuery = `
    INSERT INTO labs (lab_id, lab_name, room_no)
    VALUES ($1, $2, $3)
  `;
  const values = [lab_id, lab_name, room_no];

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



const Labput = (req, res) => {
  const { error, value } = LabSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
const lab_id= req.query.lab_id;
console.log(lab_id)
  const { lab_name, room_no } = req.body;
console.log(req.body)
  if (!lab_name) {
    return res.status(400).send('lab name is required');
  }

  let sqlQuery = `
                                UPDATE labs
                                SET lab_name = $1, room_no = $2
                                WHERE lab_id = $3
                              `;
  let values = [lab_name, room_no, lab_id];

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



const Labdelete = async (req, res) => {
  const lab_id = req.query.lab_id;
  try {
    await connection.query('DELETE FROM labs WHERE lab_id = $1 ', [lab_id]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { Labget, Labpost, Labput, Labdelete }