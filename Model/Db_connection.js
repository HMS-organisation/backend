const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'hms',
//     password: '1234',
//     port: 5432,
// });
const pool = new Pool({
    user: 'postgres',
    host: 'hms.chiu4eyawheq.ap-south-1.rds.amazonaws.com',
    database: 'hms',
    password: 'Iravisahu89',
    port: 5432,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});

pool.connect((error) => {
    if (error) {
        console.error('Error connecting to database:', error.message);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = pool; 
