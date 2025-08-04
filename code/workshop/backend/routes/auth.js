const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key'; // Use env in production

router.post('/login', (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = 'admin123';

  if (!password) return res.status(400).json({ message: 'Password is required' });
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign({ isAdmin: true }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
});

module.exports = router;
