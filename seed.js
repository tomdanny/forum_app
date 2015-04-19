var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./forumSchema.db');

db.serialize(function() {
  db.run("DROP TABLE usernames");
  db.run("DROP TABLE topics");
  db.run("DROP TABLE comments");
  db.run("CREATE TABLE usernames (id integer primary key autoincrement, name varchar);");
  db.run("CREATE TABLE topics (id integer primary key autoincrement, title varchar(255), description text, vote BOOLEAN, user_id integer, FOREIGN KEY(user_id) REFERENCES usernames(id));");
  db.run("CREATE TABLE comments (id integer primary key autoincrement, comment text, location varchar, topic_id integer, FOREIGN KEY(topic_id) REFERENCES topics(id));");

db.parallelize(function() {
  db.run("INSERT INTO usernames (name) VALUES ('tom_danny');");
  //db.run("INSERT INTO topics(title, description, vote, user_id) VALUES ('Life at GA', 'Interesting', 0, 0);");
  db.run("INSERT INTO comments(comment, location, topic_id) VAlUES ('First GA individual project', 'New York', 1);");

  });
});