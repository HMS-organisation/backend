const multer =require('multer')
const path = require ('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, './image'));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${file.filename}_${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueSuffix);
    }
  });
const upload = multer({ storage: storage });

const image=upload.single('image')
module.exports ={image} ;