# sql-with-mysql

We want to get better at SQL. Structured Query Language (SQL) is the common factor in many relational database management systems (RDBMS), lets just call them databases for now. Examples of such databases are Microsoft SQL Server and MySQL. In this little adventure we are going to use MySQL because it is open source and free (the community edition).

## Does SQL differ from database to database?

To my understanding as of right know (as a beginner), SQL for the most part is the same from database to database, but there are differences here and there. Read more about it here: http://troels.arvin.dk/db/rdbms/

## This project

I'am going to install MySQL and follow along 2 courses using the command prompt, trying to note in this read me as I go. If time permits we might also build a little node api querying the database.

https://www.youtube.com/watch?v=yPu6qV5byu4  
https://app.pluralsight.com/library/courses/introduction-to-sql

## Installation

We are going to start here: https://dev.mysql.com/doc/mysql-getting-started/en/

I installed the server, workbench and shell as a custom installation. There were alot of other things, like connectors, but those can be installed later if needed. https://dev.mysql.com/downloads/

The syntax to connect with the shell I downloaded (https://dev.mysql.com/downloads/shell/) was a little bit different than whats described in the getting started. There is also a GUI application, the so called Workbench.

## Overview

MySQL is run as a service on Windows. From the Workbench I set up connections to it, only localhost is allowed to connect (https://superuser.com/questions/702907/mysql-server-only-working-with-localhost), but I can have several connections. Only one now though, and I can connect to it. Once connected, there is a dashboard with quite a few options, the most interesting is of course the databases but also managing user. We will explore later.

One thing of note is the already created database "sys" (seen in the left panel), and if I run the statement 'show databases' I see 3 others (information schema, mysql and perfomance schema).

## Lets dive in ...

### Relational Database Basics


