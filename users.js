const User = require('../models/Users');

exports.signUsers = async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  
    try {
      const savedUser = await user.save();
      res.status(201).send(savedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  };