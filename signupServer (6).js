const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const sequelize = require('./util/database');
const jwt = require('jsonwebtoken');
const helmet = require("helmet");
 
const cors= require("cors");
 
const usersRoutes = require('./routes/users');

//app.use(helmet());

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
  });

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
  });

app.get('/add-expenses', (req, res) => {
    res.sendFile(__dirname + '/expense.html');
  });  

app.get('/forgot-password', (req, res) => {
    res.sendFile(__dirname + '/forgot-password.html');
  });    

app.use('/', usersRoutes); 
  
app.listen(4000); 

