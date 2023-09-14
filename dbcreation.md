CREATE TABLE IF NOT EXISTS users (
id int NOT NULL AUTO_INCREMENT,
username varchar(50) NOT NULL,
img_profile varchar(255),
email varchar(60) NOT NULL,
password varchar(255) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS posts(
id int NOT NULL AUTO_INCREMENT,
content varchar(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS favorites(
id int NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
post_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (id) REFERENCES users(id),
FOREIGN KEY (id) REFERENCES posts(id)
);

CREATE TABLE IF NOT EXISTS liked(
id int NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
post_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (id) REFERENCES users(id),
FOREIGN KEY (id) REFERENCES posts(id)
);
