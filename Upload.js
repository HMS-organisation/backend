const multer = require('multer');
const express = require('express');
const app = express();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Public/Images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage });

module.exports = { upload };
