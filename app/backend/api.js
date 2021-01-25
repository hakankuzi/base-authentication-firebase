// Dependencies --------------------------
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();








// *************************************************************
// MiddleWare --------------------------------------------------
/*
router.use(function(req, res, next) {
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.json({
                    status: '409',
                    message: 'invalid token',
                    user: null
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
            status: '409',
            message: 'invalid token',
            user: null
        });
    }
});
*/
// -------------------------------------------------------------
// *************************************************************
// ------------------------------------------------------------



// Return Router
module.exports = router;