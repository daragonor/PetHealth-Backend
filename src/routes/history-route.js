const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const historyAPI = require('../models/clinic_history');

router.get('/pets/:petId/history',helpers.verifyToken,(req,res)=>{
    const petId = req.params.petId;
    historyAPI.getHistory(petId,(data,err)=>{
        let response = {
            status: "",
            message: "",
            data: data
        };
        if(err){
            console.log(err);
            response.status = "Error";
            response.message = "Unable to retrieve history";
            res.status(500).send(response);
        }else{
            response.status = "OK";
            response.message = "Pets retrieved successfully";
            res.status(200).send(response);
        }
    });    
});

router.post('/appointments/:apptId/history',helpers.verifyToken,(req,res)=>{
    const appointment_id = req.params.apptId;
    const {motive,diagnosis} = req.body;
    let historyData = {motive,diagnosis,appointment_id};
    historyAPI.addHistory(historyData,(err)=>{
        let response = {
            status: "",
            message: "",
        };
        if(err){
            console.log(err);
            response.status = "Error";
            response.message = "Unable to add history";
            res.status(500).send(response);
        }else{
            response.status = "OK";
            response.message = "History added successfully";
            res.status(200).send(response);
        }
    });
});

module.exports = router;