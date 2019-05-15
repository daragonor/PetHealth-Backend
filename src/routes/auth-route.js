const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../database')
const helpers = require('../lib/helpers');

const router = express.Router();

router.post('/signup',async (req,res) => {
    let response = {
        status:"ok",
        message:"Signed Up succesfuly.",
        data: null
    }
    const { username, password, mail, photo, userable_type } = req.body;
    let user = {username,password,mail,photo,userable_type};
    user.password = await helpers.encryptPassword(password);
    // Saving in the Database
    const result = await connection.query('INSERT INTO User SET ? ', User);
    res.json(response)
});


router.post('/login', (req,res) => {
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