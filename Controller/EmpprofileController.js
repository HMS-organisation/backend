const connection = require('../Model/Db_connection');
const multer = require('multer');



//!---------------------------------GET-------------------------------//


let Emppget = async (req, res) => {
  let sqlQuery = "select * from profile";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else {
      res.send(result.rows);
    }
  });
};
let EmpgetPro = async (req, res) => {
  const empid=req.query.empid;
  let sqlQuery = "select * from profile where empid=$1" ;
  connection.query(sqlQuery,[empid], function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else {
      res.send(result.rows);
    }
  });
};




//!----------------------------------POST-------------------------------//

const Empppost = (req, res) => {
  var fullUrl = req.protocol + "://" + req.get("host") + "/Images/";
    
  let imageUrl = null;
  if (req.file && req.file.filename) {
      imageUrl = `${fullUrl}${req.file.filename}`;
      
  }

  let image = imageUrl

  const { empid, empname, dob, qualification, gender, mobile, email, address } = req.body;

  if (!empid || !empname || !dob || !qualification || !gender || !mobile || !email || !address || !image) {
    return res.status(400).send('All fields are required');

  }

  insertLabData(empid, empname, dob, qualification, gender, mobile, email, address, image, res);
};


function insertLabData(empid, empname, dob, qualification, gender, mobile, email, address, image, res) {
  let sqlQuery = `
    INSERT INTO profile (empid, empname, dob, qualification, gender, mobile, email, address, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;
  let values = [empid, empname, dob, qualification, gender, mobile, email, address, image];
  console.log(values)
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



const Emppput = (req, res) => {
  var fullUrl = req.protocol + "://" + req.get("host") + "/Images/";

  let imageUrl = null;
  if (req.file && req.file.filename) {
    imageUrl = `${fullUrl}${req.file.filename}`;
  }
  let image = imageUrl;
  const empid = req.query.empid;
  const { empname, dob, qualification, gender, mobile, email, address } = req.body;

  if (!empid || !empname || !dob || !qualification || !gender || !mobile || !email || !address || !image) {
    return res.status(400).send('All fields are required');
  }

  updateProfileData(empname, dob, qualification, gender, mobile, email, address, image, empid, res);
};

function updateProfileData(empname, dob, qualification, gender, mobile, email, address, image, empid, res) {
  let sqlQuery = `
    UPDATE profile
    SET empname = $1, dob = $2, qualification = $3, gender = $4, mobile = $5, email = $6, address = $7, image = $8
    WHERE empid = $9
  `;
  let values = [empname, dob, qualification, gender, mobile, email, address, image, empid];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }
    console.log('Data updated successfully');
    res.send('Data updated successfully');
  });
}




//!----------------------------------DELETE-------------------------------//



const Emppdelete = async (req, res) => {
  const empid = req.query.empid;
  try {
    await connection.query('DELETE FROM profile WHERE empid = $1', [empid]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { Emppget, Empppost, Emppput, Emppdelete,EmpgetPro }