const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

const cors= require("cors");

const sequelize = require('./util/database');
 
const productRoutes = require('./routes/expence');

app.use(bodyParser.json());

async function syncDatabase() {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/expence.html");
});

app.use('/', productRoutes); 

app.listen(8000);

syncDatabase();
 