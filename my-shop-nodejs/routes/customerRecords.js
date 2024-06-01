const express = require('express');
const connection = require('../connection');
const router = express.Router();

require('dotenv').config();

var auth = require('../services/authentication');
var role = require('../services/checkRole');

// create customer records
router.post('/create-customer-invoice', auth.authenticateToken, role.roleAuthenticate, (req, res) => {
    let cst = req.body;
    query = "insert into customer_invoice(name,mobile_number,purchase_date,address,comments,total,paid,dues,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m1q,m2q,m3q,m4q,m5q,m6q,m7q,m8q,m9q,m10q,m1p,m2p,m3p,m4p,m5p,m6p,m7p,m8p,m9p,m10p) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.query(query, [cst.name, cst.contact, cst.date, cst.address, cst.comments, cst.total, cst.paid, cst.dues, cst.m1, cst.m2, cst.m3, cst.m4, cst.m5, cst.m6, cst.m7, cst.m8, cst.m9, cst.m10, cst.q1, cst.q2, cst.q3, cst.q4, cst.q5, cst.q6, cst.q7, cst.q8, cst.q9, cst.q10, cst.p1, cst.p2, cst.p3, cst.p4, cst.p5, cst.p6, cst.p7, cst.p8, cst.p9, cst.p10], (err, result) => {
        if (!err) {
            return res.status(200).json({
                message: "Customer records created successfully into database."
            });
        } else {
            return res.status(500).json({
                message: err
            });
        }
    })
});
// update customer records
router.put('/update-customer-invoice/:id', auth.authenticateToken, role.roleAuthenticate, (req, res) => {
    let cst = req.body;
    const customerId = req.params['id'];
    console.log("update customer invoice:", customerId);
    if (customerId) {
        query = "update customer_invoice set name = ?,mobile_number = ?,purchase_date = ?, address = ?,comments = ?,total = ?,paid = ?,dues = ?,m1 = ?,m2 = ?,m3 = ?,m4 = ?,m5 = ?,m6 = ?,m7 = ?,m8 = ?,m9 = ?,m10 = ?,m1q = ?,m2q = ?,m3q = ?,m4q = ?,m5q = ?,m6q = ?,m7q = ?,m8q = ?,m9q = ?,m10q = ?,m1p = ?,m2p = ?,m3p = ?,m4p = ?,m5p = ?,m6p = ?,m7p = ?,m8p = ?,m9p = ?,m10p = ? where id=?";
        connection.query(query, [cst.name, cst.contact, cst.date, cst.address, cst.comments, cst.total, cst.paid, cst.dues, cst.m1, cst.m2, cst.m3, cst.m4, cst.m5, cst.m6, cst.m7, cst.m8, cst.m9, cst.m10, cst.m1q, cst.m2q, cst.m3q, cst.m4q, cst.m5q, cst.m6q, cst.m7q, cst.m8q, cst.m9q, cst.m10q, cst.m1p, cst.m2p, cst.m3p, cst.m4p, cst.m5p, cst.m6p, cst.m7p, cst.m8p, cst.m9p, cst.m10p, customerId], (err, result) => {
            if (!err) {
                return res.status(200).json({
                    message: "Customer records updated successfully into database."
                });
            } else {
                return res.status(500).json({
                    message: err
                });
            }
        })
    } else {
        return res.status(500).json({
            message: "check customer id"
        });
    }
});

// get customer records
router.get('/customer-records-list', auth.authenticateToken, role.roleAuthenticate, (req, res) => {
    // let cst = req.body;
    console.log("fetching customer records....");
    query = "select * from customer_invoice";
    connection.query(query, (err, result) => {
        if (!err) {
            let cs = [];
            if (result.length) {
                for (let i = 0; i < result.length; i++) {
                    const csi = {
                        customerId: result[i].id,
                        name: result[i].name,
                        purchaseDate: result[i].purchase_date,
                        contact: result[i].mobile_number,
                        address: result[i].address,
                        total: result[i].total,
                        paid: result[i].paid,
                        dues: result[i].dues,
                        duesPaid: result[i].duesPaid,
                        duesPaidDate: result[i].duesPaidDate,
                        comments: result[i].comments
                    };
                    cs.push(csi);
                }
            }
            result['body'] = cs;
            return res.status(200).json(cs);
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;