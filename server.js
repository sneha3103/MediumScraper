//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var path = require("path");

//Axios - promise based library. Similar to jquery ajax method
var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");

var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Require all models
// var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

//Sets up an Express Router
var router = express.Router();

require("./config/routes")(router);

//Allows request to go through router middleware
app.use(router);

mongoose.Promise = Promise;

//Middleware

//Morgan logger is used for logging requests
app.use(logger("dev"));

//Handlebars
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

// Body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Serving the public folder as a static directory

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("public"));

var db = process.env.MONGODB_URI || "mongodb://localhost/webscraper"
// Connect to the Mongo Db
mongoose.connect(db,function(error){
    if(error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection made")
    }
});


// A GET route for scraping the Medium.com website
// app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    // request("https://medium.com/", function (error, response, body) {
        // console.log(response);
      // Then, we load that into cheerio and save it to $ for a shorthand selector
    //   var $ = cheerio.load(body);
    //   console.log(response.data);

    // var articles = [];
      // Now, we grab every h3 within an article tag, and do the following:
    // $(".extremeHero-postContent h3").each(function(i, element) {

    //     var articleTitle = element.children[0].data;
    //     console.log("title", articleTitle);
  
    //     var articleLink = element.parent.attribs.href;
    //     console.log("link", articleLink);
  
    //     articles.push(`<a href= "${articleLink}">${articleTitle}</a>`);
    // });

    // res.send(articles.join("<br>"));

    // });
// });


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});