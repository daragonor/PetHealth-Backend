const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const userAPI = require('../models/user.js');

router.put('/users/:userId/image',helpers.verifyToken,(req,res)=>{
    const userId = req.params.userId;
    const {image} = req.body
    userAPI.updateUser(userId,image,(err)=>{
        let response = {
            status:"",
            message:""
        };
        if(err){
            response.status = "Error";
            response.message = "Unable to update Image";
            console.log(err);
            res.status(500).send(response);
        }else{
            response.status = "OK";
            response.message = "Image updated successfully";
            res.status(200).send(response);
        }
    });
});

module.exports = router;