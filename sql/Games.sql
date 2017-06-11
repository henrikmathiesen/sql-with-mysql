-- create this table second

create table Games(
	Id int primary key auto_increment,
    Name varchar(60) not null,
    Developer varchar(60) not null,
    Publisher varchar(60) not null,
    ReleaseYear int not null,
    AvarageRating int not null,
    UserId int not null,
    foreign key (UserId) references Users(Id)
);