const mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    // insecureAuth: false
});
connection.connect((err) => {
    if (!err) {
        console.log("mysql connected on %s@%s", process.env.DB_HOST, process.env.DB_PORT);
    } else {
        console.log('%c mysql connection error', 'color: red;');
        console.error(err);
    }
});

module.exports = connection;