
# Hero Vired app

A web app where users can manage their programs, i.e perform CRUD operations using a backend API which is developed using NodeJs, ExpressJs and other npm libraries.

User needs to be authenticated to manage the programs.

ReactJs is used to develop the frontend of this application.


## Demo

Website Link: https://hero-vired-17.web.app/

API deployed using render takes some time to perform request after some time of inactivity. So please have patience while using the app, it may take some time to perform the first request.


## Deployment

Frontend is deployed using firebase hosting.

Backend is deployed using render service.


## Run on local environment

Download the project and follow these steps:

Open the project using VS code and run these commands in terminal

Step: 1
```bash
  npm install
```
Step: 2 To start frontend, navigate to Frontend directory and run
```bash
  npm run dev
```
Step: 3 To start backend server, add a config.env file and add all the below specified environment variables with your urls or keys. Then run.

```bash
  npm start
```
After this app will be ready to run on your local environment.
## Environment Variables

To run this project, you will need to add the following environment variables to your config.env file inside the backend folder.

`NODE_ENV` with value development or production

`PORT` port on which you to run the server

`DATABASE` database URL of mongoDB cloud atlas project

`DATABASE_PASSWORD` password of your database to replace with <password> in your database URL

`JWT_SECRET` json web token secret key

`JWT_COOKIE_EXPIRES_IN` json web token cookie expiration time

`JWT_EXPIRES_IN` json web token expiration time

And make sure to add IP address from which you will be sending requests in your mongoDB atlas network access list.
