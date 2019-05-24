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
                    response.message = err;
                }else{
                    response.status = "ok";
                    response.message = "Pets where retrieved successfuly.";
                }
                res.sendStatus(200).send(response);
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
                    data: pet
                };
                if(err){
                    response.status = "Error";
                    response.message = err;
                }else{
                    response.status = "ok";
                    response.message = "Pets where retrieved successfuly.";
                }
                res.sendStatus(200).send(response);
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
            const {name, description,race,birth_date,status,image_url} = req.body;
            const owner_id = userId;
            let newPet = {name,description,race,birth_date,status,image_url,owner_id};
            petAPI.addPet(userId,newPet,(err)=>{
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
                    response.status = "Pet added successfully";
                }
                res.sendStatus(200).send(response);
            });
        }else{
            res.sendStatus(403);
        }
    });
});

router.put('/user/:userId/pets/:id',helpers.verifyToken,(req,res)=>{
    jwt.verify(req.token,helpers.secret_key,(err,authData)=>{
        if(!err){
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
                    response.message = err;
                }
                else{
                    response.status = "ok";
                    response.status = "Pet updated successfully";
                }
                res.sendStatus(200).send(response);
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
                    response.message = err;
                }
                else{
                    response.status = "ok";
                    response.status = "Pet deleted successfully";
                }
                res.sendStatus(200).send(response);
            });
        }else{
            res.sendStatus(403);
        }
    });
});

module.exports = router;