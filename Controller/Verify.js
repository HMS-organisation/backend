const connection = require('../Model/Db_connection');
const admin =require('../firebase/firebase')


let verifyToken = async (req, res) => {
  const token = req.body.token;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Perform any additional logic with the verified UID if needed

    return res.json({ verifyStatus: true, uid });
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ verifyStatus: false, Error: "Token verification error" });
  }
};

module.exports = { verifyToken };