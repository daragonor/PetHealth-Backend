const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers')

const apptAPI = require('../models/appt.js');

router.get('/appts',helpers.verifyToken, (req, res) => {
    jwt.verify(req.token, helpers.secret_key, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            apptAPI.getAppts((appts,err) => {
                if (err){}
                let response = {
                    status:"ok",
                    message:"Appointments where retrieved successfuly.",
                    data: appts
                } 
                res.json(response)
            });
        }
    }); 
});

router.post

module.exports = router;