const express = require('express')
const router = express.Router()
const users = require('../data/data');

router.get('/', (req, res) => {
    res.render('index', {
        title: "Home Page",
        path: '/',
        user: req.user
    });
    // console.log(req.user)
});

module.exports = {
    path: '/',
    router: router
};


