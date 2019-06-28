const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');

const customerAPI = require('../models/customer.js');

router.put('/customers/:customerId',helpers.verifyToken,(req,res)=>{
    const customerId = req.params.customerId;
    const {mail,name,last_name,dni,address,phone,birth_date} = req.body;
    let newData;
    newData.person = {name,last_name,dni,address,phone,birth_date};
    newData.user = {mail};
    customerAPI.updateCustomer(customerId,newData,(err)=>{
        let response = {
            status:"",
            message:""
        };
        if(err){
            response.status = "Error";
            response.message = "Unable to update Customer";
            console.log(err);
            res.status(500).send(response);
        }else{
            response.status = "OK";
            response.message = "Customer updated successfully";
            res.status(200).send(response);
        }
    });
});

router.get('/customers/:customerId',helpers.verifyToken,(req,res)=>{
    const customerId = req.params.customerId;
    customerAPI.getCustomer(customerId,(data,err)=>{
        let response = {
            status:"",
            message:"",
            data:data
        }
        if(err){
            console.log(err);
            response.status = "Error";
            response.message = "Unable to retrieve Customer";
            res.status(500).send(response);
        }else{
            response.status = "Ok";
            response.message = "Customer retrieved sucessfully";
            res.status(200).send(response);
        }
    });
});

router.get('/customers',helpers.verifyToken,(req,res)=>{
    const mail = req.query.mail;
    if(mail){
        customerAPI.getCustomerEmail(mail,(data,err)=>{
            let response = {
                status:"",
                message:"",
                data:data
            }
            if(err){
                console.log(err);
                response.status = "Error";
                response.message = "Unable to retrieve Customer";
                res.status(500).send(response);
            }else{
                response.status = "Ok";
                response.message = "Customer retrieved sucessfully";
                res.status(200).send(response);
            }
        });
    }else{
        customerAPI.getCustomers((data,err)=>{
            let response = {
                status:"",
                message:"",
                data:data
            }
            if(err){
                console.log(err);
                response.status = "Error";
                response.message = "Unable to retrieve Customer";
                res.status(500).send(response);
            }else{
                response.status = "Ok";
                response.message = "Customer retrieved sucessfully";
                res.status(200).send(response);
            }
        });
    }
    
});

module.exports = router;