const express = require('express');
const router = express.Router();

const apptAPI = require('../models/appt.js');

router.get('/appts', (req, res) => {
    apptAPI.getAppts((appts,err) => {
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