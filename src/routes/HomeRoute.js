const express = require('express');
const router = express.Router();

const news = require('../models/news.js');

router.get('/', (req, res) => {
    news.getNews((news) => {
        res.send(news)
    });
});

module.exports = router;