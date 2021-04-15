const express = require('express');
const router = express.Router();
const users = require('../data/data');
const { checkHash,  } = require('../modules/crypt');
const { generateToken } = require('../modules/jwt');

router.get('/', (req, res) => {
    res.render('login', {
        title: "Login Page",
        path: "/login",
        error: ""
    });
});

router.post('/', async (req, res) => {
    try {
        let { email, password } = req.body
        if(!(email && password)) throw new Error("Email or Password not found!");
        let user = findUser(email);
        if(!user) throw new Error("Email is not found!");
        let isTrue = await checkHash(password, user.password);
        if(!isTrue) throw new Error("Password is incorrect!")

        let user_data = { user: user.id };
        let token = generateToken(user_data)
        res.cookie('token', token).redirect('/');
    } catch (e) {
        res.render('login', {
            title: "Login",
            path: '/login',
            error: e + ""
        });
    };
});


module.exports = {
    path: '/login',
    router: router
};


function findUser (email) {
    return users.find(user => user.email == email)
};