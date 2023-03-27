create table user(
   user_id INT(20) NOT NULL AUTO_INCREMENT,
   username VARCHAR(15) NOT NULL,
   password VARCHAR(40) NOT NULL,
   PRIMARY KEY ( user_id )
);
INSERT INTO user (username, password) VALUES ('admin', '123');

CREATE TABLE comments (
    comment_id INT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    text VARCHAR(5000) NOT NULL,
    PRIMARY KEY ( comment_id )
);

INSERT INTO comments (name, text) VALUES ('admin', 'Join the Disccusion!');
delete from comments where comment_id=2;