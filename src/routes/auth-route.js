const express = require('express');
const passport = require('passport');
const connection = require('../database')
const helpers = require('../lib/helpers');

const router = express.Router();

router.post('/signup',async (req,res) => {
    let response = {
        status:"ok",
        message:"Signed Up succesfuly.",
        data: null
    }
    const { Username, Password, Mail, Photo, Userable_type } = req.body;
    let User = {Username,Password,Mail,Photo,Userable_type};
    User.Password = await helpers.encryptPassword(Password);
    // Saving in the Database
    const result = await connection.query('INSERT INTO User SET ? ', User);
    res.json(response)
});


router.post('/login', (req,res) => {
    let response = {
        status:"ok",
        message:"",
        data: { valid : false }
    }
    const { Username, Password } = req.body
    connection.query('SELECT * FROM User WHERE Username = ?', [Username], async (err, rows, fields) => {
        if(!err) {
            if (rows.length > 0) {
                const user = rows[0];
                const validPassword = await helpers.matchPassword(Password, user.Password)
                if (validPassword) {
                    response.data.valid = true
                    response.message = "Login succesful."
                } else {
                    response.message = "Incorrect Password."
                }
                res.json(response)
            } else {
                response.message = "The Username does not exists."
                res.json(response)
            }
        } else {
          console.log(err);
          response.status = "error"
          response.message = err
          res.json(response)
        }
    });  
    
})
module.exports = router;