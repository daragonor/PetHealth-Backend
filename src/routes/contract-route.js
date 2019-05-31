const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers');

const contractAPI = require('../models/contract.js');

router.get('/contracts/:contractId',helpers.verifyToken,(req,res) => {
    const contractId = req.params.contractId;
    contractAPI.getContract(contractId,(contract,err)=>{
        let response = {
            status: "",
            message: "",
            data: contract
        };
        if(err){
            response.status = "Error";
            response.message = "Unable to retrieve contract";
            console.log(err);
        }else{
            response.status = "Ok";
            response.message = "Retrieved contract successfully";
        }
        res.status(200).send(response);
    });
});

router.get('/veterinaries/:veterinaryId/contracts',helpers.verifyToken,(req,res)=>{
    const veterinaryId = req.params.veterinaryId;
    contractAPI.getVeterinaryContracts(veterinaryId,(contracts,err)=>{
        let response = {
            status:"",
            message:"",
            data:contracts
        };
        if(err){
            response.status = "Error";
            response.message = "Unable to retrieve contracts";
            console.log(err);
        }else{
            response.status = "Ok";
            response.message = "Retrieved contracts successfully";
        }
        res.status(200).send(response);
    });
});

router.get('/veterinarians/:veterinarianId/contracts',helpers.verifyToken,(req,res)=>{
    const veterinarianId = req.params.veterinarianId;
    contractAPI.getVeterinaryContracts(veterinarianId,(contracts,err)=>{
        let response = {
            status:"",
            message:"",
            data:contracts
        };
        if(err){
            response.status = "Error";
            response.message = "Unable to retrieve contracts";
            console.log(err);
        }else{
            response.status = "Ok";
            response.message = "Retrieved contracts successfully";
        }
        res.status(200).send(response);
    });
});

router.post('/veterinaries/:veterinaryId/contracts',helpers.verifyToken,(req,res)=>{
    const veterinary_id = req.params.veterinaryId;
    const request = 0;
    const {start_date,end_date,veterinarian_id} = req.body;
    let newContract = {start_date,end_date,request,veterinary_id,veterinarian_id}

    contractAPI.createContract(newContract,(err)=>{
        let response = {
            status:"",
            message:"",
        };
        if(err){
            response.status = "Error";
            response.message = "Unable to create contract";
            console.log(err);
        }else{
            response.status = "Ok";
            response.message = "Contract created successfully";
        }
        res.status(200).send(response);
    });
});

router.post('/contracts/accept/:contractId',helpers.verifyToken,(req,res)=>{
    const contractId = req.params.contractId;
    contractAPI.acceptRequest(contractId,(err)=>{
        let response = {
            status:"",
            message:""
        };
        if(err){
            response.status = "Error";
            response.message = "Error accepting contract";
            console.log(err);
        }else{
            response.status = "OK";
            response.message = "Contract accepted successfully";
        }
        res.status(200).send(response);
    });
});

router.post('/contracts/refuse/:contractId',helpers.verifyToken,(req,res)=>{
    const contractId = req.params.contractId;
    contractAPI.refuseRequest(contractId,(err)=>{
        let response = {
            status:"",
            message:""
        };
        if(err){
            response.status = "Error";
            response.message = "Error refusing contract";
            console.log(err);
        }else{
            response.status = "OK";
            response.message = "Contract refused";
        }
        res.status(200).send(response);
    });
});

router.put('/contracts/:contractId',helpers.verifyToken,(req,res)=>{
    const contract_id = req.params.contract_id;
    const {start_date,end_date,request,veterinary_id,veterinarian_id} = req.body;
    let contractData = {start_date,end_date,request,veterinary_id,veterinarian_id};
    contractAPI.updateContract(contract_id,contractData,(err)=>{
        let response = {
            status:"",
            message:""
        };
        if(err){
            response.status = "Error";
            response.message = "Unable to update contract";
            console.log(err);
        }else{
            response.status = "Ok";
            response.message = "Contract updated successfully";
        }
        res.status(200).send(response);
    });
});

router.delete('/contracts/:contractId',helpers.verifyToken,(req,res)=>{
    const contractId = req.params.contractId;
    contractAPI.deleteContract(contractId,(err)=>{
        let response ={
            status:"",
            message:""
        }
        if(err){
            response.status="Error";
            response.message = "Unable to delete contract";
            console.log(err);
        }else{
            response.status = "Ok";
            response.message = "Contract deleted successfully";
        }
        res.status(200).send(response);
    });
});

module.exports = router;