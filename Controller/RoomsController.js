const express = require('express');
const connection = require('../Model/Db_connection');
const Joi = require('joi');
const RoomsSchema = require('../Validators/RoomsValidator');

//!---------------------------------GET-------------------------------//


let Roomsget = async (req, res) => {
  let sqlQuery = "select * from room";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};



//!----------------------------------POST-------------------------------//



const Roomspost = (req, res) => {
 
  const { error, value } = RoomsSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
console.log(req.body)
  const { room_no, room_name } = req.body;

  // Check for missing fields
  if (!room_no || !room_name) {
    return res.status(400).send('All fields (room_no, room_name) are required');
  }

  // Prepare SQL query and values
  let sqlQuery = `
    INSERT INTO room (room_no, room_name)
    VALUES ($1, $2)
  `;
  let values = [room_no, room_name];

  // Execute the query
  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data: ' + err.message);
    }

    console.log('Data inserted successfully');
    // Send success response
    res.status(201).json({ success: true, newRoom: { room_no, room_name } });
  });
};



//!----------------------------------PUT-------------------------------//



const Roomsput = (req, res) => {
  const { error, value } = RoomsSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const room_no = req.query.room_no;
  const { room_name } = req.body;
  if (!room_name) {
    return res.status(400).send('Room name is required');
  }

  let sqlQuery = `
    UPDATE room 
    SET room_name = $1
    WHERE room_no = $2
  `;
  let values = [room_name, room_no];

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



const Roomsdelete = async (req, res) => {
  const room_no = req.query.room_no;
  try {
    await connection.query('DELETE FROM room WHERE room_no = $1', [room_no]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { Roomsget, Roomspost, Roomsput, Roomsdelete }