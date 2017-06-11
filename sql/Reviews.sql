-- create this table third

CREATE TABLE Reviews (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Header VARCHAR(60) NOT NULL,
    Body VARCHAR(255) NULL,
    Rating INT NOT NULL,
    GameId INT NOT NULL,
    UserId INT NOT NULL,
    FOREIGN KEY (GameId)
        REFERENCES Games (Id),
    FOREIGN KEY (UserId)
        REFERENCES Users (Id)
);