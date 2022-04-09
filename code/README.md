# How to run the Travel Lovers Application

## Software Requirements
* NodeJS
* Express
* Angular
* MySQL

## Running the back-end
**Connecting to MySQL:**

After running the install and load sql scripts use the following commands on the sql command line:
```
MySQL> create user 'TravelLover'@'localhost' identified by 'password';
MySQL> grant all on TravelLover.* to 'TravelLover'@'localhost';
```
Then in the command line:
```
node src/index.js
```
Within the directory containing the project to start the back end. If this causes an error running:
```
MySQL> ALTER USER 'TravelLover'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

**Running the express server:**
```
> cd backend/src
> node index.js
```

## Running the front-end
After running the express server:
```
> cd frontend
> ng serve
```
This will open the webapp in localhost:4200
