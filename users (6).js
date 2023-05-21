const bcrypt = require("bcrypt");
const User = require("../models/Users");

exports.signUsers = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(user.password, salt);

  user.passwordHash = hash;
  user.salt = salt;

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.loginUsers = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User not found'});
      return;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'User not authorized'});
      return;
    }

    res.status(200).json({ message: 'User login successful'});
  } catch (err) {
    res.status(500).send(err);
  }
};