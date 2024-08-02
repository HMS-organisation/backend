const { instance } = require("../Intence/Instance");
const crypto = require('crypto');
const connection = require('../Model/Db_connection');

const checkout = async (req, res) => {
  try {
    const amount = Number(req.query.amount) * 100; 
    const options = {
      amount: amount,
      currency: "INR",
    };
    
    const order = await instance.orders.create(options);
    
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature,pid,empid ,amount} = req.body;
  console.log(req.body);

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
    .update(body)
    .digest('hex');

  console.log('Signature received:', razorpay_signature);
  console.log('Signature generated:', expectedSignature);

  if (expectedSignature === razorpay_signature) {
    try {
      const sqlQuery = `INSERT INTO payments (razorpay_order_id, razorpay_payment_id, razorpay_signature,pid,empid,amount) VALUES ($1, $2, $3,$4,$5,$6)`;
      const values = [razorpay_order_id, razorpay_payment_id, razorpay_signature,pid,empid,amount];

      await connection.query(sqlQuery, values);
      console.log('Payment inserted successfully');
      res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);
    } catch (error) {
      console.error('Error inserting payment:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid signature'
    });
  }
};



module.exports = { checkout, paymentVerification };
