const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/create-user', (req, res) => {
    let user = req.body;
    query = "select phone,name,role,password,status,email from user where phone=?";
    connection.query(query, [user.phone], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                query = "insert into user(name,phone,phoneCode,email,password,role,address,status) values(?,?,?,?,?,'user',?,'active')";
                connection.query(query, [user.name,user.phone,user.phoneCode,user.email,user.password,user.address], (err, result) => {
                    if (!err) {
                        return res.status(200).json({message: "User registered successfully into our database."});
                    } else {
                        return res.status(500).json({message: err});
                    }
                })
            } else {
                res.status(400).json({message: "User Already Exist !. Try Another Mobile Number."});
            }
        } else {
            return res.status(500).json(err);
        }
    })
})
module.exports = router;