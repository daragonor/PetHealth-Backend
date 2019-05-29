const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers');

const petAPI = require('../models/pet.js');

router.get('/customers/:userId/pets',helpers.verifyToken,(req,res)=>{
            let userId = req.params.userId;
            petAPI.getAll(userId,(pets,err)=>{
                let response = {
                    status: "",
                    message: "",
                    data: pets
                };
                if(err){
                    response.status = "Error";
                    response.message = "Unable to retrieve pets";
                    console.log(err);
                }else{
                    response.status = "ok";
                    response.message = "Pets where retrieved successfuly.";
                }
                res.status(200).send(response);
            })
});

router.get('/customers/:userId/pets/:id',helpers.verifyToken,(req,res)=>{
            let id = req.params.id;
            let userId = req.params.userId;
            petAPI.getPet(userId,id,(pet,err)=>{
                let response = {
                    status: "",
                    message: "",
                    data: pet
                };
                if(err){
                    response.status = "Error";
                    response.message = "Unable to retrieve Pet";
                    console.log(err);
                }else{
                    response.status = "ok";
                    response.message = "Pets where retrieved successfuly.";
                }
                res.status(200).send(response);
            });
});

router.post('/customers/:userId/pets',helpers.verifyToken,(req,res)=>{
            console.log(req.body);
            let userId = parseInt(req.params.userId);
            const {name, description,race,birth_date,status,image_url} = req.body;
            const owner_id = userId;
            let newPet = {name,description,race,birth_date,status,image_url,owner_id};
            petAPI.addPet(newPet,(err)=>{
                let response = {
                    status: "",
                    message: "",
                }
                if(err){
                    response.status = "Error";
                    response.message = "Unable to add Pet";
                    console.log(err);
                }
                else{
                    response.status = "Ok";
                    response.message = "Pet added successfully";
                }
                res.status(200).send(response);
            });
});

router.put('/customers/:userId/pets/:id',helpers.verifyToken,(req,res)=>{
            let userId = req.params.userId;
            let petId = req.params.id;
            const {name, description,race,birth_date,status,image_url} = req.body;
            const owner_id = userId;
            let petValues = {name,description,race,birth_date,status,image_url,owner_id};
            petAPI.updatePet(userId,petValues,petId,(err)=>{
                let response = {
                    status: "",
                    message: "",
                }
                if(err){
                    response.status = "Error";
                    response.message = "Unable to edit Pet";
                    console.log(err);
                }
                else{
                    response.status = "ok";
                    response.status = "Pet updated successfully";
                }
                res.status(200).send(response);
            });
});

router.delete('/customers/:userId/pets/:id',helpers.verifyToken,(req,res)=>{
            let userId = req.params.userId;
            let petId = req.params.id;
            petAPI.deletePet(userId,petId,(err)=>{
                let response = {
                    status: "",
                    message: "",
                }
                if(err){
                    response.status = "Error";
                    response.message = err;
                }
                else{
                    response.status = "ok";
                    response.status = "Pet deleted successfully";
                }
                res.status(200).send(response);
            });
});

module.exports = router;