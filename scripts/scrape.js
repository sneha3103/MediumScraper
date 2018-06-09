// var request = require("request");
// var cheerio = require("cheerio");

// var scrape = function(cb) {
//    request("https://medium.com/", function(error, response, body){

//    var $ = cheerio.load(body);

//    var articles = [];

//    $(".extremeHero-postContent h3").each(function(i, element) {
//     var articleTitle = element.children[0].data;
//     console.log(articleTitle);

//     var articleLink = element.parent.attribs.href;
//     console.log(articleLink);

//     articles.push(`<a href= "${articleLink}">${articleTitle}</a>`);
//    });

//    res.send(articles.join("<br>"));
//  });

//  cb(articles);

// };

// module.exports = scrape;


// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

//scrape articles from the New YorK Times
var scrape = function(callback) {

  var articlesArr = [];

  request("https://www.nytimes.com/", function(error, response, html) {

      var $ = cheerio.load(html);


      $("h2.story-heading").each(function(i, element) {

          var result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this).children("a").text();
          result.link = $(this).children("a").attr("href");

          if (result.title !== "" && result.link !== "") {
              articlesArr.push(result);
          }
      });
      callback(articlesArr);
  });

};

module.exports = scrape;
