-- create this table first

CREATE TABLE Users (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(60) NOT NULL,
    Email VARCHAR(60) NOT NULL,
    Registred DATETIME NOT NULL
);