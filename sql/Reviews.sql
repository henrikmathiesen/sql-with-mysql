create table Reviews(
	Id int primary key auto_increment,
    Header varchar(60) not null,
    Body varchar(255) null,
    Rating int not null,
    GameId int not null,
    UserId int not null,
    foreign key (GameId) references Games(Id),
    foreign key (UserId) references Users(Id)
);