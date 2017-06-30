-- create this table first

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    registered VARCHAR(60) NOT NULL,
    deleted BOOLEAN NOT NULL
);