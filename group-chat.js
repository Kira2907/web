const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const userLogin= require("./routes/login");
const userMessage= require("./routes/messageForm"); 

app.use(userLogin);
app.use(userMessage);

app.use((req,res,next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});
