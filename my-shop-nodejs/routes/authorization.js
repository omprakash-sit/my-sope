const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();

var auth = require('../services/authentication');

// jwt token
router.post('/authenticate', (req, res) => {
    console.log("requested for authentication...");
    let rb = req.body;
    var query = "select name,phone,role,status,password from user where phone=?";
    connection.query(query, [rb.userId], (err, result) => {
        if (!err) {
            if (result.length && result[0].password === rb.password) {
                const response = { phone: rb.userId, role: result[0].role }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '4h' });
                res.setHeader('Authorization', accessToken);
                res.status(200).json({ id_token: accessToken });
            } else {
                return res.status(400).json({ message: "Authentication Error !" });
            }
        } else {
            res.status(500).json(err);
        }

    })
});
// login
router.post('/login', auth.authenticateToken, (req, res) => {
    let rb = req.body;
    var query = "select * from user where phone=?";
    console.log("Login request from %s", rb.userId);
    connection.query(query, [rb.userId], (err, result) => {
        if (!err) {
            if (result.length <= 0 || rb.userId != result[0].phone) {
                return res.status(401).json({ message: "Incorrect user id or password" });
            } else if (result[0].status !== "active") {
                return res.status(401).json({ message: "User is inactive." });
            } else if (result[0].password === rb.password) {
                const _records = result[0];
                const response = { id: _records.id, name: _records.name, userId: _records.phone, phoneCode: _records.phoneCode, email: _records.email, status: _records.status, role: _records.role }
                res.status(200).json(response);
            } else {
                return res.status(400).json({ message: "Please try again." });
            }
        } else {
            res.status(500).json(err);
        }

    })
});

module.exports = router;