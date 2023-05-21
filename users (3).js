const User = require('../models/Users');

exports.signUsers =  async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await user.save();
    res.status(201).send(user);
    } catch (err) {
    res.status(500).send(err);
  }
};  

exports.loginUsers =  async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    if (user.password !== password) {
      res.status(401).send('User not authorized');
      return;
    }

    res.status(200).send('User login successful');
  } catch (err) {
    res.status(500).send(err);
  }
};