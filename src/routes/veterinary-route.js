const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers');

const veterinaryAPI = require('../models/veterinary.js');

router.get('/veterinaries',helpers.verifyToken,(req,res)=>{
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const location = {latitude,longitude};
    veterinaryAPI.getCloseVeterinaries(location,(data,err)=>{
        let response = {
            status: "",
            message: "",
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
        let response = {
            status: "",
            message: "",
            data: vet
        }
        if(err){
            response.status = "Error";
            response.message = "Error retrieveing veterinary";
            console.log(err);
            res.status(500).send(response);
        }else{
            response.status = "Ok";
            response.message = "Veterinary retrieved successfully";
            res.status(200).send(response);
        }
    });
});

router.put('/veterinaries/:veterinaryId',helpers.verifyToken,(req,res)=>{
    let veterinaryId = req.params.veterinaryId;
    const {name,location,opening_hours,mail} = req.body;
    let newData = {};
    newData.veterinary = {name,location,opening_hours};
    newData.user = {mail};
    veterinaryAPI.updateVeterinary(veterinaryId,newData,(err)=>{
        let response = {
            status:"",
            message:""
        };
        if(err){
            console.log(err);
            response.status="Error";
            response.message = "Unable to update Veterinary";
            res.status(500).send(response);
        }else{
            response.status="Ok";
            response.message="Updated Veterinary successfully";
            res.status(200).send(response);
        }
    });
});

module.exports = router;