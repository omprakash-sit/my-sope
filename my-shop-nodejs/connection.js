const mysql = require('mysql');
require('dotenv').config();

// var connection = mysql.createConnection({
//     host: process.env.DB_HOST || 'mysql',  // 'localhost', //'127.0.0.1',
//     port: process.env.DB_PORT || '3306',
//     user: process.env.DB_USERNAME || 'root',
//     password: process.env.DB_PASSWORD || 'root',
//     database: process.env.DB_NAME || 'myshop'
//     // insecureAuth: false
// });
// connection.connect((err) => {
//     if (!err) {
//         console.log("mysql connected on %s@%s", process.env.DB_HOST, process.env.DB_PORT);
//     } else {
//         console.log('%c mysql connection error', 'color: red;');
//         console.error(err);
//     }
// });

// // function connectWithRetry(retries = 10, delay = 2000) {
// //     connection.connect((err) => {
// //         if (!err) {
// //             console.log("✅ MySQL connected on %s@%s", process.env.DB_HOST, process.env.DB_PORT);
// //         } else {
// //             console.error("❌ MySQL connection failed:", err.message);
// //             if (retries > 0) {
// //                 console.log(`🔁 Retrying in ${delay}ms... (${retries} left)`);
// //                 setTimeout(() => connectWithRetry(retries - 1, delay), delay);
// //             } else {
// //                 console.error("🚫 All retries failed. Exiting.");
// //                 process.exit(1);
// //             }
// //         }
// //     });
// // }

// // connectWithRetry();

// module.exports = connection;


const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'myshop'
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ MySQL connection failed:", err.message);
    } else {
        console.log("✅ MySQL connected using pool.");
        connection.release(); // release back to pool
    }
});

module.exports = pool;