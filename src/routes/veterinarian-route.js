const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers');

const personAPI = require('../models/person.js');
const vetAPI = require('../models/vet.js');

router.get('/veterinarians/:vetId',helpers.verifyToken,(req,res)=>{
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

router.put('/veterinarians/:vetId',helpers.verifyToken,(req,res)=>{
    const vetId = req.params.vetId;
    const {name,last_name,phone,address,dni,mail,birth_date,linkedin_link} = req.body;
    let newData;
    newData.vet = {linkedin_link};
    newData.person = {name,last_name,address,phone,birth_date,dni};
    newData.user = {mail};
    vetAPI.updateVet(vetId,newData,(err)=>{
        let response = {
            status:"",
            message:""
        }
        if(err){
            response.status = "Error";
            response.message = "Unable to update Veterinarian";
            console.log(err);
            res.status(500).send(response);
        }else{
            response.status = "OK";
            response.message = "Veterinarian updated successfully";
            res.status(200).send(500);
        }
    });
});

module.exports = router;