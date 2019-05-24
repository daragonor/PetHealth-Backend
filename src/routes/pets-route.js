const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers');

const petAPI = require('../models/pet.js');

router.get('/user/:userId/pets',helpers.verifyToken,(req,res)=>{
    jwt.verify(req.token,helpers.secret_key,(err,authData)=>{
        if(!err){
            let userId = req.params.userId;
            petAPI.getAll(userId,(pets,err)=>{
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

router.get('/user/:userId/pets/:id',helpers.verifyToken,(req,res)=>{
    jwt.verify(req.token,helpers.secret_key,(err,authData)=>{
        if(!err){
            let id = req.params.id;
            let userId = req.params.userId;
            petAPI.getPet(userId,id,(pet,err)=>{
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

router.post('/user/:userId/pets',helpers.verifyToken,(req,res)=>{
    jwt.verify(req.token,helpers.secret_key,(err,authData)=>{
        if(!err){
            let userId = req.params.userId;
            const {name, description,race,birth_date,status,image_url,owner_id} = req.body;
            let newPet = {name,description,race,birth_date,status,image_url,owner_id};
            petAPI.addPet(userId,newPet,(err)=>{
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

router.put('/user/:userId/pets/:id',helpers.verifyToken,(req,res)=>{
    jwt.verify(req.token,helpers.secret_key,(err,authData)=>{
        if(!err){
            const {name, description,race,birth_date,status,image_url,owner_id} = req.body;
            let petValues = {name,description,race,birth_date,status,image_url,owner_id};
            let userId = req.params.userId;
            let petId = req.params.id;
            petAPI.updatePet(userId,petValues,petId,(err)=>{
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

router.delete('/user/:userId/pets/:id',helpers.verifyToken,(req,res)=>{
    jwt.verify(req.token,helpers.secret_key,(err,authData)=>{
        if(!err){
            let userId = req.params.userId;
            let petId = req.params.id;
            petAPI.deletePet(userId,petId,(err)=>{
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