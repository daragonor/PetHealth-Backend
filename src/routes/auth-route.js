const express = require('express');
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers');
const router = express.Router();

const userAPI = require('../models/user')
const socialURLAPI = require('../models/social_url')
const veterinaryAPI = require('../models/veterinary')
const personAPI = require('../models/person')
const vetAPI = require('../models/vet')
const customerAPI = require('../models/customer')

router.post('/signup',async (req,res) => {

    let response = {
        status:"ok",
        message:"",
        data: {}
    }
    const { username, password, mail, photo, userable_type, name, last_name, dni, phone,address,
        linkedin_link, degree, location, opening_hours, website_url, youtube_url, twitter_url } = req.body;
    let user = {username,password,mail,photo,userable_type};

    user.password = await helpers.encryptPassword(password);
    //new way
    userAPI.addUser(user,(userId,err) => {
        let person = {person_id : userId, name, last_name, dni, address, phone}
        switch (userable_type) {
            case 0:
                let  socialURL = {website_url, youtube_url, twitter_url}
                socialURLAPI.addSocialURL(socialURL,(socialURLId,err) => {
                    let veterinary = {veterinary_id : userId, social_url_id : socialURLId, name, phone, location, opening_hours}
                    veterinaryAPI.addVeterinary(veterinary,(veterinaryId, err) => {
                        response.data.user = user
                        response.message = "Veterinary signup succesful."
                        response.data.access_token = jwt.sign({ id:  userId }, helpers.secret_key)
                        res.status(200).send(response)
                    })
                })
                break;
            case 1:
                let vet = {veterinarian_id : userId, linkedin_link, degree}
                personAPI.addPerson(person,(personId, err) => {
                    vetAPI.addVet(vet, (vetId, err) => {
                        response.data.user = user
                        response.message = "Veterinarian signup succesful."
                        response.data.access_token = jwt.sign({ id:  userId }, helpers.secret_key)
                        res.status(200).send(response)
                    })
                })
                break;
            case 2:
                let customer = {customer_id : userId}
                personAPI.addPerson(person,(personId, err) => {
                    customerAPI.addCustomer(customer, (vetId, err) => {
                        response.data.user = user
                        response.message = "Customer signup succesful."
                        response.data.access_token = jwt.sign({ id:  userId }, helpers.secret_key)
                        res.status(200).send(response)
                    })
                })
                break;
            default:
                break;
        }
    })
});

router.post('/login', (req,res) => {

    let response = {
        status:"ok",
        message:"",
        data: { user : {}, access_token: "" }
    }
    const { username, password } = req.body
    userAPI.getUser(username,async (user,err) => {
        if (!err){
            if (user) {
                const validPassword = await helpers.matchPassword(password, user.password)
                if (validPassword) {
                    response.data.user = user
                    response.message = "Login succesful."
                    response.data.access_token = jwt.sign({ id:  user.id }, helpers.secret_key)
                    res.status(200).send(response);
                } else {
                    response.message = "Incorrect Password."
                }
                res.status(200).send(response)
            } else {
                response.message = "The Username does not exists."
                res.status(200).send(response)
            }
        } else {
          console.log(err);
          response.status = "error"
          response.message = err
          res.send(response)
        }
    }) 
})
module.exports = router;