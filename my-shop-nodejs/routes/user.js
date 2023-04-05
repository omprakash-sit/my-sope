const express = require('express');
const connection = require('../connection');
const router = express.Router();

const nodemailer = require('nodemailer');
require('dotenv').config();

var auth = require('../services/authentication');
var role = require('../services/checkRole');

// create user
router.post('/create-user', auth.authenticateToken, (req, res) => {
    let user = req.body;
    query = "select phone,name,role,password,status,email from user where phone=?";
    connection.query(query, [user.phone], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                query = "insert into user(name,phone,phoneCode,email,password,role,address,status) values(?,?,?,?,?,'user',?,'active')";
                connection.query(query, [user.name, user.phone, user.phoneCode, user.email, user.password, user.address], (err, result) => {
                    if (!err) {
                        return res.status(200).json({ message: "User registered successfully into our database." });
                    } else {
                        return res.status(500).json({ message: err });
                    }
                })
            } else {
                res.status(400).json({ message: "User Already Exist !. Try Another Mobile Number." });
            }
        } else {
            return res.status(500).json(err);
        }
    })
});

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
// forget password
router.post('/forget-password', auth.authenticateToken, (req, res) => {
    let rb = req.body;
    query = "select email,password from user where email=?";
    connection.query(query, [rb.email], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                console.error("No matching records found.");
                return res.status(200).json({ message: "Password sent successfully to your mail." });
            } else {
                let mailOptions = {
                    from: process.env.EMAIL,
                    to: result[0].email,
                    subject: "Password by my-shop management system.",
                    html: `<p>You have requested for forget password. Here is your login details <br/> 
                    <b>Email id - ${result[0].email} <br/> Password - ${result[0].password}</b>
                    <br/>Click here to <a href="http://localhost:4200/#/login" target="_blank">login</a></p>`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent:" + info.response);
                    }
                });
                return res.status(200).json({ message: "Password sent successfully to your email." });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

// get all users
router.get('/get-all-users', auth.authenticateToken, role.roleAuthenticate, (req, res) => {
    let rb = req.body;
    query = "select id,name,phone,email,phoneCode,address,status from user where role='user'";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({ body: result });
        } else {
            return res.status(500).json(err);
        }
    });
});
// update user status
router.patch('/update-user-status', auth.authenticateToken, role.roleAuthenticate, (req, res) => {
    let rb = req.body;
    query = "update user set status=? from user where (id=?)";
    connection.query(query, [rb.status, rb.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "User id does not exist." });
            } else {
                return res.status(200).json({ message: "Status updated successfully." });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});
// update password
router.patch('/update-password', auth.authenticateToken, role.roleAuthenticate, (req, res) => {
    let rb = req.body;
    let userId = res.locals.phone;
    var query = "select * from user where phone=? and password=?";
    connection.query(query, [userId, rb.oldPassword], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                return res.status(400).json({ message: "Incorrect old password." });
            } else if (result[0].password === rb.oldPassword) {
                query = "update user set password=? where phone=?";
                connection.query(query, [rb.newPassword, userId], (err, result) => {
                    if (!err) {
                        return res.status(200).json({ message: "Password updated successfully." });
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                return res.status(400).json({ message: "Something went wrong, please try again later." });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;