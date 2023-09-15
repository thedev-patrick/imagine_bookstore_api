const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Store user data in the database
    const newUser = new User({ username, password: hash, email });

    // Assuming there's a 'create' method in your User model
    await newUser.create();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'User registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findByUsername(username);

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Compare the hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      'your_secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
