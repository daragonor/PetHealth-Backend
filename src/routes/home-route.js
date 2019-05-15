const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers')

const newsAPI = require('../models/news.js');

router.get('/news',helpers.verifyToken, (req, res) => {
    jwt.verify(req.token, helpers.secret_key, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            newsAPI.getNews((news,err) => {
                if (err){}
                let response = {
                    status:"ok",
                    message:"News where retrieved succesfuly.",
                    data: news
                }  
                res.json(response)
            });
        }
    }); 
});

module.exports = router;