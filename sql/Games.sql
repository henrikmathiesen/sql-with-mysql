create table Games(
	Id int primary key auto_increment,
    Name varchar(60) not null,
    Publisher varchar(60) not null,
    AvarageRating int not null,
    UserId int not null,
    foreign key (UserId) references Users(Id)
);