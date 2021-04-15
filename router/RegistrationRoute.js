const express = require('express');
const router = express.Router();
const users = require('../data/data');
const { generateHash,  } = require('../modules/crypt');
const uuid = require('uuid').v4

// Router
router.get('/', (req, res) => {
    res.render('registration', {
        title: "Registration Page",
        path: "/registration"
    });
});

// Post
router.post('/', async (req, res) => {
    try {
        let { name, email, password, age } = req.body
        if(!(name && email && password && age)) throw new Error("Fields isn't complated") 
        if(findUser(email)) throw new Error("This email already in use")
        users.push({
            id: uuid(),
            name, 
            email, 
            password: await generateHash(password), 
            age})
        res.redirect('/login')
    } catch (e) {
        res.render('registration', {
            title: "Registration",
            path: '/registration',
            error: e + ""
        });
    };
});

module.exports = {
    path: '/registration',
    router: router
};

function findUser(email) {
    return users.find(user => user.email == email)
}