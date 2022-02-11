"use strict";

// var http = require("http");
var express = require("express");

// configure the port
var port = 8000;

/* Create a http Server
var server = http.createServer( … ); */
// Create an express app object and then set up your routes with handler functions
var app = express();

// configure static dir
app.use(express.static("assets"));

// set up our templating engine
app.set("view_engine", "ejs");
app.set("views", "templates");

//set products
var products = [
    {
        id : 11111,
        name : "The Lion King",
        date : "DEC 23",
        time : "Thu 19:30",
        location : "Dublin - Bord Gais Energy Theatre",
        price : "€70.00 each",
        picture: "img/11111.png"
    },
    {
        id : 24601,
        name : "Les Miserables",
        date : "FEB 08",
        time : "Tue 19:30",
        location : "Dublin - Bord Gais Energy Theatre",
        price : "€70.00 each",
        picture: "img/24601.png"
    },
    {
        id : 66666,
        name : "Chicago",
        date : "APR 05",
        time : "Tue 19:30",
        location : "Dublin - Bord Gais Energy Theatre",
        price : "€55.00 each",
        picture: "img/66666.png"
    }
];


//products' list page
app.get('/products', function(req, res) {
    res.render("products.ejs", {"product": products});
});

//products' individual page
app.get('/products/:id', function(req, res) {
    // set the params id
    var id = req.params.id;
    // use filter to choose the correspondent object
    var name = products.filter(function (product) { return product.id == id;})[0].name;
    var date = products.filter(function (product) { return product.id == id;})[0].date;
    var time = products.filter(function (product) { return product.id == id;})[0].time;
    var location = products.filter(function (product) { return product.id == id;})[0].location;
    var price = products.filter(function (product) { return product.id == id;})[0].price;
    // render the template
    res.render("product.ejs", {"productId": id, "productName": name, "productDate": date,"productTime": time,
                                "productLocation": location,"productPrice": price});
    //check the information
    console.log("Request for user with product name", req.params.id);
});

//search page
app.get("/search", function (req, res) {
    // set the query search term
    var searchterm = req.query.searchterm;
    if(searchterm == undefined){
        // render the search template
        res.render("search.ejs", {})
    }
    else{
        //check the information users' submitted
        var check = products.some(item => {
            if(item.id == searchterm || item.name == searchterm){
                return true;
            }
        })
        if(check && !isNaN(searchterm)){
            //check the information
            console.log("Search results for "+searchterm+".");
            console.log("Found");
            // use filter to choose the correspondent object
            var name = products.filter(function (product) { return product.id == searchterm;})[0].name;
            var date = products.filter(function (product) { return product.id == searchterm;})[0].date;
            var time = products.filter(function (product) { return product.id == searchterm;})[0].time;
            var location = products.filter(function (product) { return product.id == searchterm;})[0].location;
            var price = products.filter(function (product) { return product.id == searchterm;})[0].price;
            // render the template
            res.render("product.ejs", {"productId": searchterm, "productName": name, "productDate": date,"productTime": time,
                                        "productLocation": location,"productPrice": price});
        }
        else if(check && isNaN(searchterm)){
            // use filter to choose the correspondent object
            var id = products.filter(function (product) { return product.name == searchterm;})[0].id;
            var date = products.filter(function (product) { return product.name == searchterm;})[0].date;
            var time = products.filter(function (product) { return product.name == searchterm;})[0].time;
            var location = products.filter(function (product) { return product.name == searchterm;})[0].location;
            var price = products.filter(function (product) { return product.name == searchterm;})[0].price;
            // render the template
            res.render("product.ejs", {"productId": id, "productName": searchterm, "productDate": date,"productTime": time,
                                        "productLocation": location,"productPrice": price});
        }
        else{
            // render the template
            res.render("notfound.ejs", {"searchterm": searchterm});
            //check the information
            console.log("Not found");
        } 
    }   
});

// listen on our assigned port number
app.listen(port);

// some feedback for the web admin
console.log("Server running on http://localhost:"+port);