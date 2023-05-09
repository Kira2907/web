const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/contact-us', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'form.html'));
});

router.post('/contact-us', (req, res, next) => {
    res.redirect('/success');
});

router.get('/success', (req, res, next) => {
    res.send('<h1>Form successfully filled</h1>');
}); 
    

module.exports = router;
