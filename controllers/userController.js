const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({ name: req.body.name });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'User creation failed' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Could not fetch users' });
  }
};
