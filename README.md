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

It is built for manipulating relational databases. SQL is not case sensitive, but it is convention to write SQL specific words (like SELECT) in uppercase and user defined words (like column names) in lower case. We can write comments in SQL, -- is for single line comments, and /* comment */ is for multi line comments.

SQL statements start with a command, for example SELECT. SELECT MyColumnName, 'Constant' FROM MyTableName;

#### Naming things (user defined words)

Naming conventions can vary, but the most important thing is to be consistent. Here are some conventions that can be used:

Table names will be singular: user, email, phone -- it describes what a row in that table is

Column names will never repeat inside of one database, that includes primary keys which should be named tablename_id -- useful when joining tables

#### Names in SQL are scoped

Database.Table , Table.Column

#### Creating a Database

CREATE DATABASE Products;  
USE DATABASE Products;

Creates a database and switches the context to it, so for example a SELECT statement is run against that database.

CREATE TABLE Products.Game (...);

Creates a table Game under the Products database, with column definitions in parentheses.

##### Column definitions
