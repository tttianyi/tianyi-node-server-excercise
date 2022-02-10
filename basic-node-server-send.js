"use strict";

// var http = require("http");
var express = require("express");
// configure the port
var port = 8000;

/* Create a http Server
var server = http.createServer( … ); */
// Create an express app object and then set up your routes with handler functions
var app = express();

//welcome page
app.get("/", function (req, res) {
    res.send("Welcome to the home page!");
});

//check the port running
app.listen(port);
console.log("Server running on http://localhost:"+ port);

//products' list page
app.get('/products', function(req, res) {
    res.send( "Here is the products' list!");
});

//products' individual page
app.get('/products/:id', function(req, res) {
    var productName = req.params.id;
    res.send("This is the information for your selected product "+ productName +".");
    console.log("Request for user with product name", req.params.id);//check the information
});

//search page
app.get("/search", function (req, res) {
    var searchterm = req.query.searchterm;
    if(searchterm){
        res.send("Search results for "+searchterm+".");
    }
    else{
        res.send("Enter a search term.");
    }
});