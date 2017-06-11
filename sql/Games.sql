-- create this table second

CREATE TABLE Games (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(60) NOT NULL,
    Developer VARCHAR(60) NOT NULL,
    Publisher VARCHAR(60) NOT NULL,
    ReleaseYear INT NOT NULL,
    AvarageRating INT NOT NULL,
    UserId INT NOT NULL,
    FOREIGN KEY (UserId)
        REFERENCES Users (Id)
);