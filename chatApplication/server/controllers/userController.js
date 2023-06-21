const User = require('../models/user');

// Create a new user
exports.createUser = (req, res) => {
  const { name, age, status } = req.body;

  const newUser = new User({
    name,
    age,
    status
  });

  newUser.save()
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to create a new user' });
    });
};
