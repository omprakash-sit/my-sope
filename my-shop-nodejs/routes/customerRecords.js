const express = require('express');
const connection = require('../connection');
const router = express.Router();

require('dotenv').config();

var auth = require('../services/authentication');
var role = require('../services/checkRole');

// create customer records
router.post('/create-customer-records', auth.authenticateToken, role.roleAuthenticate, (req, res) => {
    let cst = req.body;
    query = "insert into customer_records(name,contact,date,address,comments,descriptions,total,paid,dues,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m1q,m2q,m3q,m4q,m5q,m6q,m7q,m8q,m9q,m10q,m1p,m2p,m3p,m4p,m5p,m6p,m7p,m8p,m9p,m10p,m1qp,m2qp,m3qp,m4qp,m5qp,m6qp,m7qp,m8qp,m9qp,m10qp) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.query(query, [cst.name, cst.contact, cst.date, cst.address, cst.comments, cst.descriptions, cst.total, cst.paid, cst.dues, cst.m1, cst.m2, cst.m3, cst.m4, cst.m5, cst.m6, cst.m7, cst.m8, cst.m9, cst.m10, cst.m1q, cst.m2q, cst.m3q, cst.m4q, cst.m5q, cst.m6q, cst.m7q, cst.m8q, cst.m9q, cst.m10q, cst.m1p, cst.m2p, cst.m3p, cst.m4p, cst.m5p, cst.m6p, cst.m7p, cst.m8p, cst.m9p, cst.m10p, cst.m1qp, cst.m2qp, cst.m3qp, cst.m4qp, cst.m5qp, cst.m6qp, cst.m7qp, cst.m8qp, cst.m9qp, cst.m10qp], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Customer records created successfully into database." });
        } else {
            return res.status(500).json({ message: err });
        }
    })
});

// get customer records
router.get('/customer-records-list', auth.authenticateToken, role.roleAuthenticate, (req, res) => {
    // let cst = req.body;
    console.log("fetching customer records....");
    query = "select * from customer_records";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;