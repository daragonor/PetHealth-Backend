const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers');

const veterinaryAPI = require('../models/veterinary.js');

router.get('/veterinaries',helpers.verifyToken,(req,res)=>{
    const {latitude,longitude} = req.body;
    const location = {latitude,longitude};
    veterinaryAPI.getCloseVeterinaries(location,(data,err)=>{
        let response = {
            status = "",
            message = "",
            data: data
        };
        if(err){
            console.log(err);
            response.status =  "Error";
            response.message = "Unable to retrieve veterinaries";
            res.status(500).send(response);
        }else{
            response.status = "Ok";
            response.message = "Veterinaries retrieved successfully";
            res.status(200).send(response);
        }
    });
});

router.get('/veterinaries/:veterinaryId',helpers.verifyToken,(req,res)=>{
    let veterinaryId = req.params.veterinaryId;
    veterinaryAPI.getVeterinary(veterinaryId,(vet,err)=>{
        let repsonse = {
            status: "",
            message = "",
            data: vet
        }
        if(err){
            response.status = "Error";
            response.message = "Error retrieveing veterinary";
            console.log(err);
            res.status(500).send(response);
        }else{
            response.status = "Ok";
            response.message = "Veterinary retrieve successfully";
            res.status(200).send(response);
        }
    });
});

module.exports = router;