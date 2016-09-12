//======Setup=======

//Dependencies - External
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request'); 
var cheerio = require('cheerio');
var express = require('express');
var app = express();

//Dependencies - Internal
var Article = require("./models/Article.js");
var Comment = require("./models/Comment.js");

//Add Body Parser Middlewarß
app.use(bodyParser.urlencoded({
  extended: false
}));

//Use public directory
app.use(express.static('public'));

//Mongoose - Configure and connect to the database 
mongoose.connect('mongodb://localhost/scrapeGoose');
var db = mongoose.connection;

//Mongoose - show errors
db.on("error", function(error){
	console.log("Mongoose error: ", error);
});

//Mongoose - success message upon database connection
db.once("open", function(){
	console.log("The 'goose is go!")
});


//======Routes=======

//Home route
app.get('/', function(request, response) {
  res.send(index.html);
});

//Scrape route
app.get("/scrape", function(req, res){
	var url = "http://www.streetsblog.org/";
	request(url, function (error, response, html) {
		if(error){
		throw error;
		}

		//Load the scraped site's html into cheerio
		var $ = cheerio.load(html);

		//loop through each scraped article
		$("h2.post-title").children().each(function (i, element){
			var title = $(element).text().trim();
			var link = $(element).attr("href");

			var result = {
			    title: title,
			    link: link
			};

		  	var scrapedArticle = new Article(result);

		  	scrapedArticle.save(function(error, doc){
		  		if (error){
		  			console.log("error: ", error);
		  		}else{
		  			console.log(doc)
		  		}
		  	});
		});
		response.send("Site scraped!")
	});
})

