const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers');

const petAPI = require('../models/pet.js');

router.get('/pets',helpers.verifyToken,(req,res)=>{
    jwt.verify(req.token,helpers.secret_key,(err,authData)=>{
        if(!err){
            petAPI.getAll((pets,err)=>{
                let response = {
                    status: "",
                    message: "",
                    data: pets
                };
                if(err){
                    response.status = "Error";
                    response.message = "Error retrieving Pets";
                }else{
                    response.status = "ok";
                    response.message = "Pets where retrieved successfuly.";
                }
                res.json(response);
            })
        }else{
            res.sendStatus(403);
        }
    });
});

router.get('/pets/:id',helpers.verifyToken,(req,res)=>{
    jwt.verify(req.token,helpers.secret_key,(err,authData)=>{
        if(!err){
            let id = req.params.id;
            petAPI.getPet(id,(pet,err)=>{
                let response = {
                    status: "",
                    message: "",
                    data: pets
                };
                if(err){
                    response.status = "Error";
                    response.message = "Error retrieving Pets";
                }else{
                    response.status = "ok";
                    response.message = "Pets where retrieved successfuly.";
                }
                res.json(response);
            });
        }else{
            res.sendStatus(403);
        }
    });
});

router.post('/pets',helpers.verifyToken,(req,res)=>{
    jwt.verify(req.token,helpers.secret_key,(err,authData)=>{
        if(!err){
            const {name, description,race,birth_date,status,image_url,owner_id} = req.body;
            let newPet = {name,description,race,birth_date,status,image_url,owner_id};
            petAPI.addPet(newPet,(err)=>{
                let response = {
                    status: "",
                    message: "",
                }
                if(err){
                    response.status = "Error";
                    response.message = "Error adding pet";
                }
                else{
                    response.status = "ok";
                    response.status = "Pet added successfully";
                }
                res.json(response);
            });
        }else{
            res.sendStatus(403);
        }
    });
});

router.put('/pets/:id',helpers.verifyToken,(req,res)=>{
    jwt.verify(req.token,helpers.secret_key,(err,authData)=>{
        if(!err){
            const {name, description,race,birth_date,status,image_url,owner_id} = req.body;
            let petValues = {name,description,race,birth_date,status,image_url,owner_id};
            let petId = req.params.id;
            petAPI.updatePet(petValues,petId,(err)=>{
                let response = {
                    status: "",
                    message: "",
                }
                if(err){
                    response.status = "Error";
                    response.message = "Error updating pet";
                }
                else{
                    response.status = "ok";
                    response.status = "Pet updated successfully";
                }
                res.json(response);
            });
        }else{
            res.sendStatus(403);
        }
    });
});

router.delete('/pets/:id',helpers.verifyToken,(req,res)=>{
    jwt.verify(req.token,helpers.secret_key,(err,authData)=>{
        if(!err){
            let petId = req.params.id;
            petAPI.deletePet(petId,(err)=>{
                let response = {
                    status: "",
                    message: "",
                }
                if(err){
                    response.status = "Error";
                    response.message = "Error deleting pet";
                }
                else{
                    response.status = "ok";
                    response.status = "Pet deleted successfully";
                }
                res.json(response);
            });
        }else{
            res.sendStatus(403);
        }
    });
});

module.exports = router;