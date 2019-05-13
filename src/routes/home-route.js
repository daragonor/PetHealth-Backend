const express = require('express');
const router = express.Router();
const newsAPI = require('../models/news.js');

router.get('/news', (req, res) => {
    newsAPI.getNews((news,err) => {
        if (err){}
        let response = {
            status:"ok",
            message:"News where retrieved succesfuly.",
            data: news
        }  
        res.json(response)
    });
});

module.exports = router;