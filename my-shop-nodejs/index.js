const express = require('express');
var cors = require('cors');
// const connection = require('./connection'); 
const authRoute = require('./routes/authorization');
const userRoute = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', authRoute);
app.use('/user', userRoute)

module.exports = app;
