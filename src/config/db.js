const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,      
    user: process.env.DB_USER,       
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME,
}).promise();

  //  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10), 
   // waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS === 'true',
  //  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT, 10) ,
  //  acquireTimeout: 60000, // 60 second
 //   connectTimeout: 60000,   
     
// }).promise();


module.exports = db;
