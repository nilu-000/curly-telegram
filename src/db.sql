CREATE DATABASE newer;
CREATE TABLE users({
    id VARCHAR(32) NOT NULL AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    isAdmin BOOLEAN DEFAULT false,
    PRIMARY KEY(id)
});

