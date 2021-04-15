const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();


// Configs
require('dotenv').config();
const PORT = process.env.PORT
// Listen
if(PORT){
    app.listen(PORT, () => console.log(`SERVER READY AT ${PORT}`))
} else {
    console.log("Please set PORT environment");
}



// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

const blackListMiddlewares = ["AuthMiddleware.js"]

const middlewarePath = path.join(__dirname, 'middlewares')
fs.readdir(middlewarePath, (err, res) => {
    
    res.forEach(middlewareFile => {
        let middleware = require('./middlewares/' + middlewareFile)
        if(middleware && !(blackListMiddlewares.includes(middlewareFile))){
            app.use(middleware)
        }
    })
})

// Settings 
app.set('view engine', 'ejs');

const routerPath = path.join(__dirname, 'router')
fs.readdir(routerPath, (err, res) => {
    res.forEach(routerFile => {
        let route = require('./router/' + routerFile)
        if(route) {
            app.use(route.path, route.router)
        }
    });
});