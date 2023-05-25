const path = require('path');

const express = require('express');

const usersController = require('../controllers/users');
const expenceController = require('../controllers/expence');

const router = express.Router();

router.post('/sign-up', usersController.signUsers);
router.post('/login', usersController.loginUsers);

router.post("/expenses", expenceController.addExpense);

router.get("/expenses", expenceController.getExpense);

router.delete("/expenses/:id", expenceController.deleteExpense);  

module.exports = router;  
