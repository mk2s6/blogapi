//Routes package
var express = require('express'),
 router = express.Router(),

 parser = require('body-parser'),
 fs = require('fs');


var mongodb = require('mongoose');
var Schema = mongodb.Schema;
const url = "mongodb://127.0.0.1:27017/blog";


var blogPostSchema = new Schema({
	name : String,
	title : String,
	blogContent : String
}, {collection : 'blogPosts'});

var blogData = mongodb.model('blogPosts', blogPostSchema);



router.use(parser.json());

router.get('/', function(req, res, next) {
  	res.render('index.hbs', { title: 'BLOG NAME' });
});

router.get('/blog', function (req, res) {
	
	res.render('blog.hbs', {title : 'Blog page' });
})

router.get('/blogContent', function (req, res) {
	mongodb.connect(url, function (err, db) {
	  if(err) console.log("Unable to connect to database " + err);
	  else {
	    console.log("Connected to database");
	        blogData.find().then(function (posts) {
	    	res.json(posts);
	    })	    
	  }
	});
});

router.post('/addPost' , function (req, res) {
	var postData = {
		name : req.body.name,
		title : req.body.title,
		blogContent : req.body.blogContent
	}
	mongodb.connect(url, function (err, db) {
	  	if(err) console.log("Unable to connect to database " + err);
	  	else {
	  		var data = new blogData(postData);
	  		data.save();
	  		res.send({
	  			msg : "Post Inserted To database",
	  			redirectTo : "/blog"
	  		})
	  	}
	});

});

module.exports = router;