-- create this table second

CREATE TABLE games (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    developer VARCHAR(60) NOT NULL,
    publisher VARCHAR(60) NOT NULL,
    genre VARCHAR(60) NOT NULL,
    releaseYear INT NOT NULL,
    avarageRating INT NOT NULL,
    deleted BOOLEAN NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId)
        REFERENCES users (id)
);