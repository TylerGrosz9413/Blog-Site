//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to Vikes Talk! Where we discuss the hottest topics related to the Minnesota Vikings. You can see all of our blog posts below. If you are looking for a specific post, you can search for that post by typing '/posts/' and then the name of the post at the end of the url.";
const aboutContent = "We are a blog that covers the Minnesota Vikings football team. We are passionate about keeping fans up-to-date on the latest Vikings news and providing commentary on things related to the team.";
const contactContent = "You can email us at contact@vikestalk.com.";
let posts = []
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  res.render('home', {paragraph: homeStartingContent,posts: posts })
})
app.get('/about', function(req, res) {
  res.render('about', {about: aboutContent})
})
app.get('/contact', function(req, res) {
  res.render('contact', {contact: contactContent})
})
app.get('/compose', function(req, res) {
  res.render('compose')
})
app.get('/posts/:text', function(req, res) {

  posts.forEach(function(post) {
    if (_.lowerCase(req.params.text) === _.lowerCase(post.title)) {
    res.render('post', {
      post: post
    });
  }})
})



app.use(express.static("public"));

app.post('/compose', function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    author: req.body.postAuthor,
    date: new Date().toDateString()
  };
    posts.push(post)
    res.redirect('/')
})










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
