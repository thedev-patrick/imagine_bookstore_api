const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();


router.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Hashing error' });
    }

    // Store user data in the database
    const newUser = new User(username, hash, email);
    console.log(hash);
    User.create(newUser, (err, result) => {
      if (err) {
        return res.status(400).json({ error: 'User registration failed' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  User.findByUsername(username, (err, user) => {
    if (err || !user) {
      console.log(`User: ${user}`);
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Compare the hashed password
    bcrypt.compare(password, user.password, (err, match) => {
      if (!match) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token });
    });
  });
});

module.exports = router;

