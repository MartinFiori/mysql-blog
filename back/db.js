const mysql = require('mysql');
const { host, user, password, database } = require('./utils/config.js');

const db = mysql.createConnection({
  host,
  user,
  password
});

// Connect to MySQL server
db.connect((err) => {
  if (err) throw new Error(err);
  console.log('Connected to MySQL');

  // Create the database
  db.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (err) => {
    if (err) throw new Error(err);
    // Switch to the created database
    db.changeUser({ database }, (err) => {
      if (err) throw new Error(err);
      // Create the users table
      const usersQuery = `
                          CREATE TABLE IF NOT EXISTS users (
                          id int NOT NULL AUTO_INCREMENT,
                          username varchar(50) NOT NULL,
                          img_profile varchar(255),
                          email varchar(60) NOT NULL,
                          password varchar(255) NOT NULL,
                          PRIMARY KEY(id)
                          );`;
      db.query(usersQuery, (err) => {
        if (err) throw new Error(err);
      });


      const postsQuery = `
                        CREATE TABLE IF NOT EXISTS posts(
                        id int NOT NULL AUTO_INCREMENT,
                        content varchar(255) NOT NULL
                        );`
      db.query(postsQuery, (err) => {
        if (err) throw new Error(err);
      });

      const favoritesQuery = `
                            CREATE TABLE IF NOT EXISTS favorites(
                            id int NOT NULL AUTO_INCREMENT,
                            user_id INT NOT NULL,
                            post_id INT NOT NULL,
                            PRIMARY KEY(id),
                            FOREIGN KEY (id) REFERENCES users(id),
                            FOREIGN KEY (id) REFERENCES posts(id)
                            );`
      db.query(favoritesQuery, (err) => {
        if (err) throw new Error(err);
      });


      const likedQuery = `
                        CREATE TABLE IF NOT EXISTS liked(
                        id int NOT NULL AUTO_INCREMENT,
                        user_id INT NOT NULL,
                        post_id INT NOT NULL,
                        PRIMARY KEY(id),
                        FOREIGN KEY (id) REFERENCES users(id),
                        FOREIGN KEY (id) REFERENCES posts(id)
                        );`
      db.query(likedQuery, (err) => {
        if (err) throw new Error(err);
      });
    });
  });
});

module.exports = db;
