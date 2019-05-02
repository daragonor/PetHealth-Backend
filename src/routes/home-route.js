const express = require('express');
const router = express.Router();

const newsAPI = require('../models/news.js');

router.get('/news', (req, res) => {
    newsAPI.getNews((news,err) => {
        if (err){}
        res.json(news)
    });
});

module.exports = router;