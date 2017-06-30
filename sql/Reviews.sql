-- create this table third

CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    header VARCHAR(60) NOT NULL,
    body VARCHAR(255) NULL,
    rating INT NOT NULL,
    deleted BOOLEAN NOT NULL,
    gameId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (gameId)
        REFERENCES games (id),
    FOREIGN KEY (userId)
        REFERENCES users (id)
);