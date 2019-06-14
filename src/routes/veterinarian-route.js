const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers');

const personAPI = require('../models/person.js');
const vetAPI = require('../models/vet.js');

router.get('/veterinarian/:vetId',helpers.verifyToken,(req,res)=>{
    const vetId = req.params.vetId;
    let response = {
        status:"",
        message:"",
        data:{
            person:null,
            vet:null
        }
    };
    personAPI.getPerson(vetId,(person,err) => {
        response.data.person = person;
        if(err){
            console.log(err);
            response.status = "Error";
            response.message = "Unable to retrieve veterinarian";
            res.status(500).send(response);
        }else{
            vetAPI.getVet(vetId, (vet,err) => {
                if(err){
                    console.log(err);
                    response.status = "Error";
                    response.message = "Unable to retrieve veterinarian";
                    res.status(500).send(response);
                }else{
                    response.data.vet = vet;
                    res.status(200).send(response);
                }
            });
        }
    });
});

router.put('/veterinarian/:vetId',helpers.verifyToken,(req,res)=>{
    const vetId = req.params.vetId;
    const {name,last_name,phone,address} = req.body;
});

module.exports = router;