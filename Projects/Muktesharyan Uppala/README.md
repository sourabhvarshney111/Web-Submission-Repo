# Introduction

This is the Git Repository for the Kisan Hetu (For the sake of Farmers) Web App. This is a platform for farmers where they can easily create their account and sell their crops directly to the end consumer.

## Development Mode Running

Run "npm init" in the code folder for inializing.
Next we need to install all the dependencies for backend,  
For that run the following command
_npm i express bcryptjs config express express-validator jsonwebtoken mongoose request uuid validator_

_npm i -D nodemon concurrently_ for development dependencies

Inside the client folder run this command for installing react app dependencies,
_npm install axios moment react react-dom react-moment react-redux react-router-dom react-scripts redux redux-thunk_

Run _npm run dev_ in the code folder to start the servers for front and back end
You shall get the following message in the terminal and the react app will be hosted on 5000 port localhost will be opened
"Mongodb connected"
This means you have successfully ran the App.........

## Website Overview

The homepage of the site is simple intro page with links for Login, Register etc.

Both the forms at Sign Up and Sign In pages have Hindi language support for helping farmers understand the labels easily.

All the fields are validated both on client and server side. Authentication is done using phone number and Aadhar number which must be unique for an account. Fake 12 digit Aadhar numbers are also detected in the validation. For any error on client/server side alerts will be shown.

After successful registration/login the user will be redirected automatically to the profile page which shows info about the user. Unless the user logs out the browser will retain the Logged In state even if the website is closed. The Profile page is a protected route and cannot be accessed unless a user is logged in. If the user logs out the login page will be opened.

**_More Features will be added in the future_**
