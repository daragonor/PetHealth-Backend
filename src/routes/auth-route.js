const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../database')
const helpers = require('../lib/helpers');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post('/signup', async (req,res) => {
    let response = {
        status:"ok",
        message:"Signed Up succesfuly.",
        data: null
    }
    const { username, password, mail, photo, userable_type, 
        name, last_name, dni, phone,address,
        linkedin_link, degree,
        location, opening_hours,
        website_url, youtube_url, twitter_url } = req.body;
    let user = {username,password,mail,photo,userable_type};
    user.password = await helpers.encryptPassword(password);
    // Saving in the Database
    connection.query('INSERT INTO User SET ? ', user, async (err, rows)=>{
        const userId = rows.insertId
        let person = {person_id : userId, name, last_name, dni, address, phone}
        switch (userable_type) {
            case 0:
                let socialUrl = {website_url, youtube_url, twitter_url}
                connection.query('INSERT INTO SocialURL SET ? ', socialUrl, (err, rows) => {
                    const socialURLId = rows.insertId
                    let veterinary = {veterinary_id : userId, social_url_id : socialURLId, name, phone, location, opening_hours}
                    connection.query('INSERT INTO Veterinary SET ? ', veterinary, (err, rows) => {
                        res.status(200).send(response)
                    })
                })
            case 1:
                let vet = {veterinarian_id : userId, linkedin_link, degree}
                connection.query('INSERT INTO Person SET ? ', person, (err, rows) => {
                    connection.query('INSERT INTO Veterinarian SET ? ', vet, (err, rows) => {
                        res.status(200).send(response)
                    })
                })
            case 2:
                let customer = {customer_id : userId}
                connection.query('INSERT INTO Person SET ? ', person, (err, rows) => {
                    connection.query('INSERT INTO Customer SET ? ', customer, (err, rows) => {
                        res.status(200).send(response)
                    })
                })
            default:
                break;
        }
    })
});


router.post('/login', upload.none(), (req,res) => {
    const formData = req.body;
    console.log('form data', formData);
    let response = {
        status:"ok",
        message:"",
        data: { user : {}, access_token: "", }
    }
    const { username, password } = req.body
    connection.query('SELECT * FROM User WHERE username = ?', [username], async (err, rows) => {
        if(!err) {
            if (rows.length > 0) {
                const user = rows[0];
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
    });  
    
})
module.exports = router;