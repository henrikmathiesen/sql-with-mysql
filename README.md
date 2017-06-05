# sql-with-mysql

We want to get better at SQL. Structured Query Language (SQL) is the common factor in many relational database management systems (RDBMS), lets just call them databases for now. Examples of such databases are Microsoft SQL Server and MySQL. In this little adventure we are going to use MySQL because it is open source and free (the community edition).

## Does SQL differ from database to database?

To my understanding as of right know (as a beginner), SQL for the most part is the same from database to database (ANSI SQL), but there are differences here and there. Read more about it here: http://troels.arvin.dk/db/rdbms/

## This project

I'am going to install MySQL and follow along some courses, trying to note in this read me as I go. If time permits we might also build a little node api querying the database.

https://www.youtube.com/watch?v=yPu6qV5byu4  
https://app.pluralsight.com/library/courses/introduction-to-sql

## Installation

We are going to start here: https://dev.mysql.com/doc/mysql-getting-started/en/

I installed the server, workbench and shell as a custom installation. There were alot of other things, like connectors, but those can be installed later if needed. https://dev.mysql.com/downloads/

The syntax to connect with the shell I downloaded (https://dev.mysql.com/downloads/shell/) was a little bit different than whats described in the getting started. There is also a GUI application, the so called Workbench, a RDMS (Relational Database Management System).

## Overview

MySQL is run as a service on Windows. From the Workbench I set up connections to it, only localhost is allowed to connect (https://superuser.com/questions/702907/mysql-server-only-working-with-localhost), but I can have several connections. Only one now though, and I can connect to it. Once connected, there is a dashboard with quite a few options, the most interesting is of course the databases but also managing user. We will explore later.

One thing of note is the already created database "sys" (seen in the left panel), and if I run the statement 'show databases' I see 3 others (information schema, mysql and perfomance schema).

## Lets dive in ...

### Database Basics

A database is a container that help us organize data, most useful when we have a lot of data. We can query, update, insert and delete the data in the database. A database also provide one source of thruth for our data. There are different types of databases: relational, object oriented, document based. In this project we will focus on relational databases. SQL is the common language for operations on relational databases.

In a relational database data is stored in a table with columns, where the data is stored as rows. The table and columns describe the data, the column also has a restriction on the size and type of data (data type, size, required/not required) that can be stored in that column. Each table should have one key column that can uniquely identify a row, this is called a Primary Key. A table can also have a column called Foreign Key, that is a link to a Primary Key in another table.

When designing tables, think about using relations between tables instead of adding columns to one table.

ContactsTable: Id, First_Name, Last_Name  
EmailTable: Id, Contact_Key, Email_Address

### SQL

It is built for manipulating relational databases. SQL is not case sensitive, but it is convention to write SQL specific words (like SELECT) in all uppercase and user defined words (like column names) in normal case. We can write comments in SQL, -- is for single line comments, and /* comment */ is for multi line comments.

SQL statements start with a command, for example SELECT. SELECT MyColumnName, 'Constant' FROM MyTableName;

#### Naming things (user defined words)

Naming conventions can vary, but the most important thing is to be consistent. Here are some conventions that can be used:

Table names will be singular: user, email, phone -- it describes what a row in that table is

Column names will never repeat inside of one database, that includes primary keys which should be named tablename_id -- useful when joining tables

#### My naming convention (for now)

Tables and Columns should be PascalCase. Table names in plural form. Column names can repeat across tables, but in queries we can scope them, for example: SELECT g.Name, g.Id FROM Games g; to avoid naming collisions.

#### Discussions about naming conventions

https://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names  
https://stackoverflow.com/questions/7662/database-table-and-column-naming-conventions

#### Names in SQL are scoped

Can be relevant if columns have the same name in different tables.

Database.Table , Table.Column

#### Creating a Database

CREATE DATABASE Products;  
USE DATABASE Products;

Creates a database and switches the context to it, so for example a SELECT statement is run against that database.

CREATE TABLE Products.Games (...); or just: CREATE TABLE Games (...); If already in the context of Products DB.

Creates a table Games under the Products database, with column definitions in parentheses.

##### Column definitions

(ColumnName DATATYPE,  
ColumnName DATATYPE)

These are the most common datatypes:

CHARACTER: can hold exactly N  
CHARACTER VARYING: can hold 0-N characters  
BINARY: Hexadecimal data, files, 
SMALLINT: -32 768 to 32 767  
INTEGER: -2 147 483 648 to 2 147 483 647  
BIG INT: -9 223 372 036 854 775 808 to 9 223 372 036 854 775 807  
BOOLEAN: true or false  
DATE: YYYY-MM-DD  
TIME: HH:MM:SS  
TIMESTAMP: Both DATE and TIME

SQL example: https://www.w3schools.com/sql/sql_create_table.asp

##### Column Constraints

(ColumnName DATATYPE CONSTRAINTS,  
ColumnName DATATYPE CONSTRAINTS)

NOT NULL, by default columns are allowed null value, add NOT NULL contraint to disallow, example:  
https://www.w3schools.com/sql/sql_notnull.asp

UNIQUE, this constraint ensures that all values in a column are different. A PRIMARY KEY constraint automatically has a UNIQUE constraint. But you can have many UNIQUE constraints per table but only one PRIMARY KEY. Example: https://www.w3schools.com/sql/sql_unique.asp

PRIMARY KEY, this uniquely identifies each row in the table and is always NOT NULL, can be auto incremented. Example:  
https://www.w3schools.com/sql/sql_primarykey.asp  
https://www.w3schools.com/sql/sql_autoincrement.asp

FOREIGN KEY, is used to link 2 tables together. A FOREIGN KEY points to a PRIMARY KEY in another table. Example:  
https://www.w3schools.com/sql/sql_foreignkey.asp

Constraints also can be set after the list of arguments to create table, useful for example naming a PRIMARY KEY that points to two columns.  

(ColumnName DATATYPE,  
ColumnName DATATYPE,  
CONSTRAINT PK_Person PRIMARY KEY (ID,LastName))

Example (scroll down): https://www.w3schools.com/sql/sql_primarykey.asp

##### Adding Constraints after Table is created

This can sometimes be useful, pericular FOREIGN KEY contraints, since relationships can become much clearer after all tables are created. Example set FOREIGN KEY on ALTER TABLE: https://www.w3schools.com/sql/sql_foreignkey.asp

## Moving on to more hands on practice

Since MySQL workbench has good intellisence and because SQL syntax is not hard to Google, Iam not going to note every type of query here. The exception might be important notes on some things. W3Schools has a useful SQL toutorial with lots of examples: https://www.w3schools.com/sql/default.asp

### SELECT Statement with a WHERE Clause

https://www.w3schools.com/sql/sql_select.asp  
https://www.w3schools.com/sql/sql_distinct.asp  
https://www.w3schools.com/sql/sql_where.asp

SELECT g.Id, g.Name  
FROM Games g  
WHERE g.Name = 'Fallout';

SELECT g.Id, g.Name, g.Rating  
FROM Games g  
WHERE g.Rating BETWEEN 9 AND 10;

SQL Comparison Operators for WHERE clause:  
https://www.w3schools.com/sql/sql_operators.asp

SQL Logical Operators for WHERE clause:  
https://www.w3schools.com/sql/sql_operators.asp

Most important to remember (SQL vs other):  
= , ==  
<> , !=  
AND , &&  
OR , ||

#### IS / IS NOT

Used only for checking for null (can not use = or <>)

SELECT g.id, g.name  
FROM Games g  
WHERE g.foo IS NOT NULL;

### Functions

SELECT COUNT( * ) FROM Games; -- return count (including NULL values)  
SELECT COUNT( * ) as numberOfPeople from person; -- can name result set  
SELECT COUNT(g.Foo) FROM Games as g; -- return count (excluding NULL values)  
SELECT MAX(g.Rating) FROM Games as g;  
SELECT COUNT(DISTINCT a.Street) from Address as a; -- 'lorem', 'lorem', 'ipsum' will result in 2

MAX, MIN, AVG, SUM

https://mariadb.com/kb/en/sql-99/set-functions/

### Shaping a Result

https://www.w3schools.com/sql/sql_orderby.asp
