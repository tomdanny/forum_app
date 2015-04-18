var express = require('express');
var sqlite3 = require('sqlite3');
var fs = require('fs');
var Mustache = require('mustache');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var marked = require('marked');

var db = new sqlite3.Database('./forumSchema.db');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/views'));


// THIS IS WELCOME INDEX PAGE
app.get('/', function(req, res) {
  res.send(fs.readFileSync("./views/index.html", 'utf8'));
});
// THIS IS THE END OF WELCOME INDEX PAGE

// -------------------------------------------------------

// THIS IS CREATING NEW USERNAME
app.post('/usernames/create', function(req, res){
  console.log(req.body);
  db.run("INSERT INTO usernames (name) VALUES ('" + req.body.name + "')");
  res.redirect('/topics');
  //user = req.body.name;
  res.send("Welcome " + req.body.name);
});
// THIS IS END OF CREATING NEW USERNAME

// --------------------------------------------------------

// THIS IS LISTING ALL THE TOPICS
  app.get('/topics', function(req, res) {
    var template = fs.readFileSync('./views/topic.html', 'utf8');

    db.all('SELECT * FROM topics;', function(err, topics) {
      var html = Mustache.render(template, {allTopics: topics});
      res.send(html);
  });
});
// THIS IS THE END OF ALL THE TOPICS

// ---------------------------------------------------------

// THIS IS GETTING YOU TO PAGE TO CREATE TOPIC
  app.get('/topics/new', function(req, res) {
    res.send(fs.readFileSync('./views/new_topic.html', 'utf8'));
    res.redirect('/topics');
});
// THIS IS THE END OF GETTING TO CREATE TOPIC PAGE

// ----------------------------------------------------------

// THIS IS CREATING NEW TOPIC
app.post('/topics/new', function(req, res) {
  //console.log(req.body)
  db.all("SELECT * FROM usernames WHERE name = '" + req.body.name + "';", {}, function(err, data){
  db.all("SELECT * FROM topics WHERE user_id = '" + data.id + "';", {}, function(err, user){
    //console.log(user)
    user = user.id
  db.run("INSERT INTO topics (title, vote, user_id) VALUES ('" + req.body.title + "', '" + req.body.description + "', '" + 0 + "', '" + user + "')");
  //console.log(req.body.name)
  res.redirect('/topics');
 });
});
});

// THIS IS THE END OF CREATING NEW TOPIC

// -----------------------------------------------------------

// THIS IS GETTING YOU TO SPECIFIC TOPIC TO VOTE OR COMMENT
app.get('/topics/:id', function(req, res){
  var id = req.params.id;
  db.all("SELECT * FROM topics WHERE id = " + id + ";", {}, function(err, topic){
    fs.readFile('./views/read_topic.html', 'utf8', function(err, html){
      //console.log(topic);
      var renderedHTML = Mustache.render(html, topic[0]);
      res.send(renderedHTML);
    });
  });
});
// THIS IS THE END OF SPECIFIC TOPIC

// -----------------------------------------------------------

// app.delete('/usernames/:id', function(req, res){
//   var id = req.params.id;
//   db.run("DELETE FROM usernames WHERE id = " + id + ";");
//   res.redirect("/usernames");
// });

// ----------------------------------------------------------

// THIS IS UPDATING VOTE ON SPECIFIC TOPIC
app.put('/topics/:id', function(req, res){
  var id = req.params.id;
  var userVote = 0;
  //if(id) {
  while(userVote < 10) {
  //for(var userVote = 0; userVote < 7;) {

  //userVote ++;
  //console.log(userVote)
  //res.send(userInfo)
  db.run("UPDATE topics SET vote = '" + userVote++ + "' WHERE id = " + id + ";");
  res.redirect('/topics/' + id);
  //}
  }
});
// THIS IS THE END OF UPDATING VOTE ON SPECIFIC TOPIC

// ----------------------------------------------------------

// THIS IS COMMENTING ON SPECIFIC TOPIC
app.post('/topics/topic_id/comments', function(req, res){
  console.log(req.body);
  db.run("INSERT INTO comments (comment) VALUES ('" + req.body.comment + "')");
  res.redirect('/topics/:id');
  //user = req.body.name;
});
// THIS IS END OF COMMENTING ON SPECIFIC TOPIC

app.listen(3000, function() {
  console.log("LISTENING");
});