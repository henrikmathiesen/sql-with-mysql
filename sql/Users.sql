create table Users(
	Id int primary key auto_increment,
    Name varchar(60) not null,
    Email varchar(60) not null,
    Registred datetime not null
);