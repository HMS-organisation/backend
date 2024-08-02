const connection = require('../Model/Db_connection');

const Invoice = async (req, res) => {
    const { pid } = req.query;

    if (!pid) {
        return res.status(400).send({ error: "Missing pid parameter" });
    }

    const sqlQuery = `SELECT * FROM invoice_details WHERE pid = $1;`;
    const values = [pid];

    try {
        connection.query(sqlQuery, values, (err, result) => {
            if (err) {
                console.error(err.sqlMessage);
                return res.status(500).send(err);
            }

            const invoiceDetails = result.rows;


            res.send({ invoiceDetails });
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const InvoiceGet = async (req, res) => {
    sql = `select * from invoice_details`
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err.sqlMessage);
        }
        else {
            res.send(result.rows)
        }
    })
}



const InvoicPos = async (req, res) => {
    const { invoice_id, pid, selectedTestDetails } = req.body;
    if (!selectedTestDetails || !Array.isArray(selectedTestDetails)) {
        return res.status(400).send({ error: "Invalid or missing selectedTestDetails" });
    }

    const sqlQuery = `INSERT INTO invoice_details (invoice_id, pid, test_name, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`;

    try {
        const results = await Promise.all(selectedTestDetails.map(detail => {
            const values = [invoice_id, pid, detail.testname.trim(), parseFloat(detail.testprice)];
            return new Promise((resolve, reject) => {
                connection.query(sqlQuery, values, (err, result) => {
                    if (err) {
                        console.error(err.sqlMessage);
                        reject(err);
                    } else {
                        resolve(result.rows[0]);
                    }
                });
            });
        }));
        res.send(results);
    } catch (error) {
        res.status(500).send(error);
    }
};

let Paymentget = async (req, res) => {
    const pid = req.query.pid;
    let sqlQuery = `SELECT
    (COALESCE(SUM(price), 0) * 1.05) - 
    COALESCE((SELECT SUM(amount) FROM payments WHERE pid = $1), 0) AS pay
FROM invoice_details
WHERE pid = $2`;
    connection.query(sqlQuery,[pid,pid], function (err, result) {
        if (err)
            console.log(err.sqlMessage);
        else {
            res.send(result.rows);
        }
    });
};
let AdPaymentget = async (req, res) => {
    let sqlQuery = `select * from payments`;
    connection.query(sqlQuery, function (err, result) {
        if (err)
            console.log(err.sqlMessage);
        else {
            res.send(result.rows);
        }
    });
};
module.exports = { Invoice, InvoicPos, InvoiceGet,Paymentget ,AdPaymentget}