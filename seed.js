var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./forumSchema.db');

db.serialize(function() {
  db.run("DROP TABLE usernames");
  db.run("DROP TABLE topics");
  db.run("DROP TABLE comments");
  db.run("CREATE TABLE usernames (id integer primary key autoincrement, name varchar);");
  db.run("CREATE TABLE topics (id integer primary key autoincrement, title varchar(255), description text, vote integer, user_id integer, FOREIGN KEY(user_id) REFERENCES usernames(id));");
  db.run("CREATE TABLE comments (id integer primary key autoincrement, comment text, location varchar, topic_id integer, FOREIGN KEY(topic_id) REFERENCES topics(id));");

db.parallelize(function() {
  db.run("INSERT INTO usernames (name) VALUES ('admin');");
  db.run("INSERT INTO usernames (name) VALUES ('jake');");
  db.run("INSERT INTO topics(title, description, vote, user_id) VALUES ('Soccer', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 0, 2);");
    db.run("INSERT INTO topics(title, description, vote, user_id) VALUES ('Food', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur', 0, 2);");
    db.run("INSERT INTO topics(title, description, vote, user_id) VALUES ('TV Shows', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur', 0, 2);");
    db.run("INSERT INTO topics(title, description, vote, user_id) VALUES ('Cars', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat', 0, 2);");
    // db.run("INSERT INTO topics(title, description, vote, user_id) VALUES ('TV Shows', 'Soccer', 0, jake);");
    // db.run("INSERT INTO comments(comment, location, topic_id) VAlUES ('First GA individual project', 'New York', 1);");

  });
});