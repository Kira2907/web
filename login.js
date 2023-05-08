const express= require("express");

const fs= require("fs");

const router= express.Router();

// Serve the login form on the homepage
router.get('/login', (req, res, next) => {
    res.send(`
      <form action="/login" method="post" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username">
        <button type="submit">Login</button>
      </form>
    `);
  });
  
  // Handle the login form submission
  router.post('/login', (req, res,next) => {
    res.redirect('/');
  });

  module.exports= router;