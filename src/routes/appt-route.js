const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers')

const apptAPI = require('../models/appt.js');
const petAPI = require('../models/pet')

let response = {
    status:"ok",
    message:"Appointments where retrieved successfuly.",
    data: {}
} 

router.post('/user/:userId/appts',helpers.verifyToken, (req, res) => {
    
    apptAPI.getApptsDataByUserId(req.params.userId,req.body.userable_type,(apptsData,err) => {
        if (err){}
        response.data = apptsData
        res.json(response)
    });
});

module.exports = router;