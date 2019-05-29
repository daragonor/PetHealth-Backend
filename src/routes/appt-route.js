const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers')

const apptAPI = require('../models/appt.js');

router.get('/user/:userId/appts',helpers.verifyToken, (req, res) => {
    apptAPI.getApptsByUserId(req.params.userId,req.body.userable_type,(appts,err) => {
        if (err){}
        let response = {
            status:"ok",
            message:"Appointments where retrieved successfuly.",
            data: appts
        } 
        res.json(response)
    });
});

module.exports = router;