"use strict";

/*
require modules
 */
var express = require("express");
var bodyParser = require("body-parser");// require the body-parser module
var session = require("express-session");

// set up variables
var port=8000;

/*
Create our express app object
 */
var app = express();

/*
Configure middlewares
 */
app.use(session({secret: "ttgfhrwgedgnl7qtcoqtcg2uyaugyuegeuagu111",
                resave: false,
                saveUninitialized: true,
                cookie: {maxAge: 60000}}));
app.use(express.static("assets"));
app.set("view-engine", "ejs");
app.set("views", "templates");
app.use(bodyParser.urlencoded({extended: true}));// tell our app to use the body-parser middleware

//set users information
var userInfo = [
    {
        id : 1,
        name : "Tianyi",
        password : "aheartfulloflove"
    },
    {
        id : 2,
        name : "Yuzuru",
        password : "youzi"
    },
    {
        id : 3,
        name : "Anna",
        password : "qianjin"
    },
    {
        id : 4,
        name : "Boyang",
        password : "tiantian"
    },
    {
        id : 5,
        name : "Hongyi",
        password : "spark"
    }
];

/*
Configure application Routes
 */
app.get("/", function(req, res){
    var sessionData = req.session.username;
    if (sessionData) {
        res.render("index.ejs", {"username": sessionData, "link": "profile"});
    } else {
        res.render("index.ejs", {"username": "Log in", "link": "login"});
    }
})


app.get("/login", function(req, res) {
    res.render("login.ejs", {});
});

app.post("/login", function(req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    var check = userInfo.some(function(item) {
        if(item.name == user && item.password == pass){
            return true;
        }
    })
    if(check){
        // validate the username and password
        req.session.username = user;
        console.log(user);
        res.redirect("/profile");
        
    }
    else{
        res.redirect("/login");
    }
    
});

app.get("/profile", function(req, res) {
    var sessionData = req.session.username;
    res.render("profile.ejs", {"username": sessionData});
});

app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
});


/*
Start the server
 */
app.listen(port);
console.log("Server running on http://localhost:"+port);
