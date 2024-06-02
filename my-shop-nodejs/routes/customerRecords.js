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
        connection.query(query, [cst.name, cst.contact, cst.date, cst.address, cst.comments, cst.total, cst.paid, cst.dues, cst.m1, cst.m2, cst.m3, cst.m4, cst.m5, cst.m6, cst.m7, cst.m8, cst.m9, cst.m10, cst.q1, cst.q2, cst.q3, cst.q4, cst.q5, cst.q6, cst.q7, cst.q8, cst.q9, cst.q10, cst.p1, cst.p2, cst.p3, cst.p4, cst.p5, cst.p6, cst.p7, cst.p8, cst.p9, cst.p10, customerId], (err, result) => {
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
                        comments: result[i].comments,
                        materials: getMaterialsList(result[i])
                    };
                    cs.push(csi);
                }
            }
            // result['body'] = cs;
            return res.status(200).json(cs);
        } else {
            return res.status(500).json(err);
        }
    });
});

function getMaterialsList(m) {
    if (m) {
        const _m = {
            m1: m.m1,
            m2: m.m2,
            m3: m.m3,
            m4: m.m4,
            m5: m.m5,
            m6: m.m6,
            m7: m.m7,
            m8: m.m8,
            m9: m.m9,
            m10: m.m10,
            q1: m.m1q,
            q2: m.m2q,
            q3: m.m3q,
            q4: m.m4q,
            q5: m.m5q,
            q6: m.m6q,
            q7: m.m7q,
            q8: m.m8q,
            q9: m.m9q,
            q10: m.m10q,
            p1: m.m1p,
            p2: m.m2p,
            p3: m.m3p,
            p4: m.m4p,
            p5: m.m5p,
            p6: m.m6p,
            p7: m.m7p,
            p8: m.m8p,
            p9: m.m9p,
            p10: m.m10p,
        };
        let c = 1;
        let _ml = [];
        while (c && c <= 10) {
            if (_m["m" + c] && _m["q" + c]) {
                let mo = {
                    m: _m["m" + c],
                    q: _m["q" + c],
                    p: _m["p" + c],
                    mqp: (_m["q" + c] * _m["p" + c])
                };
                _ml.push(mo);
            }
            c++;
        }
        return _ml;
    } else {
        return [];
    }
}
module.exports = router;