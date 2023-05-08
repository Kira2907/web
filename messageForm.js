const express= require("express");

const fs= require("fs");

const router= express.Router();

// Serve the messages page
router.get('/', (req, res, next) => {
    fs.readFile('message.txt', 'utf8', (err, data) => {
      if (err) throw err;
      const messages = data.split('\n');
      res.send(`
       <h2>Messages:</h2>
       <ul>
         ${messages.map((message) => `<li>${message}</li>`).join('')}
       </ul>
       <form action="/" method="post" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
         <input type="text" id="message" name="message">
         <input type="hidden" id="username" name="username">
         <button type="submit">Send</button>
       </form>
     `);
   });
 });

 // Handle the message form submission
router.post('/', (req, res, next) => {
    const username =  req.body.username;
    const message = req.body.message;
      fs.appendFile('message.txt', `${username}: ${message}\n`, (err) => {
      if (err) throw err;
      console.log('Message added to file');
    });
    res.redirect('/');
  });

module.exports= router;  