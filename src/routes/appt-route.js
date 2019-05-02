const express = require('express');
const router = express.Router();

const apptAPI = require('../models/appt.js');

router.get('/appts', (req, res) => {
    apptAPI.getAppts((appts,err) => {
        if (err){}
        res.json(appts)
    });
});

module.exports = router;