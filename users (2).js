const path = require('path');

const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.post('/sign-up', usersController.signUsers);

module.exports = router;  
