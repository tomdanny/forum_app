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

app.get('/', function(req, res) {
  res.send(fs.readFileSync("./views/index.html", 'utf8'));
});

app.post('/usernames/create', function(req, res){
  console.log(req.body);
  db.run("INSERT INTO usernames (name) VALUES ('" + req.body.name + "')");
  res.redirect('/topics');
  //user = req.body.name;
  res.send("Welcome " + req.body.name);
});

  app.get('/topics', function(req, res) {
    var template = fs.readFileSync('./views/topic.html', 'utf8');

    db.all('SELECT * FROM topics;', function(err, topics) {
      var html = Mustache.render(template, {allTopics: topics});
      res.send(html);
  });
});

  app.get('/topics/new', function(req, res) {
    res.send(fs.readFileSync('./views/new_topic.html', 'utf8'));
    res.redirect('/topics');
});

  // app.post('/topics/:id', function(req, res) {
  //     db.run("INSERT INTO topics (title, description, vote, user_id) VALUES ('" + req.body.title + "', '" + req.body.description + "', 0 , 2)");
  //     res.redirect('/topics');
    // var id = req.params.id;
    // db.all("SELECT * FROM topics WHERE id = " + id + ";", {}, function(err, topics) {

    // })
  //});

app.get('/topics/:id', function(req, res){
  var id = req.params.id;
  db.all("SELECT * FROM topics WHERE id = " + id + ";", {}, function(err, topic){
    fs.readFile('./views/read_topic.html', 'utf8', function(err, html){
      console.log(topic);
      // Sending just the single puppy object. No need to iterate this way. Sweet.
      var renderedHTML = Mustache.render(html, topic[0]);
      res.send(renderedHTML);
    });
  });
});

app.delete('/usernames/:id', function(req, res){
  var id = req.params.id;
  db.run("DELETE FROM usernames WHERE id = " + id + ";");
  res.redirect("/usernames");
});

app.put('/usernames/:id', function(req, res){
  var id = req.params.id;
  var userInfo = req.body;
  db.run("UPDATE usernames SET name = '" + userInfo.name + "' WHERE id = " + id + ";");
  res.redirect('/usernames');
});

app.listen(3000, function() {
  console.log("LISTENING");
});