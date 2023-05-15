const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors'); 
const app = express();

const sequelize = require('./util/database');
const User = require('./models/user');

const userRoutes= require('./routes/user');

app.use(cors());
app.use(bodyParser.json({extended:false}));

app.use('/user', userRoutes);

app.listen(4000);

 