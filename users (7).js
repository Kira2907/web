const { User, expensesData } = require("../models/Users");
const jwt = require('jsonwebtoken');
 
exports.signUsers = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.loginUsers = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { email }});

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }
    res.redirect('/add-expenses');
  } catch (err) {
    res.status(500).send(err);
  }
};