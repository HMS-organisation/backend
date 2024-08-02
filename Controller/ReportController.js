const express = require('express');
const connection = require('../Model/Db_connection');


//!---------------------------------GET-------------------------------//


let Reporget = async (req, res) => {
  let sqlQuery = "select * from report";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};
let Addget = async (req, res) => {
  let sqlQuery = "select * from additional";
  connection.query(sqlQuery, function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};

let PatiReport = async (req, res) => {
  let pid = req.query.pid;
  let sqlQuery = `select * from report where pid=$1`;
  connection.query(sqlQuery, [pid], function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};
let Reportdel = async (req, res) => {
  let pid = req.query.pid;
  let sqlQuery = `delete from report where pid=$1`;
  connection.query(sqlQuery, [pid], function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};
let ReportUp = async (req, res) => {
  let pid = req.query.pid;
  const report_date= new Date().toLocaleDateString()
  const {  report_type, summary } = req.body;
  let sqlQuery = `UPDATE report SET report_date =$1,    report_type =$2   ,   summary=$3  where pid=$4`;
  connection.query(sqlQuery, [report_date, report_type, summary, pid], function (err, result) {
    if (err)
      console.log(err.sqlMessage);
    else
      res.send(result.rows);
  });
};



//!----------------------------------POST-------------------------------//


const Reportpost = (req, res) => {

  const { pid, report_type, summary } = req.body;
  const report_date = new Date().toLocaleDateString();
  const report_id = 'R' + pid;
  const values = [pid, report_date, report_type, summary, report_id];
  let sqlQuery = `INSERT INTO Report (pid,  report_date, report_type, summary,report_id)
    VALUES ($1, $2, $3, $4,$5)`;
  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }
    else {
      console.log('Data Posted successfully');
      res.send(`Data Posted successfully`);
    }
  });


}






module.exports = { Reporget, Reportpost, PatiReport, Reportdel, ReportUp, Addget }