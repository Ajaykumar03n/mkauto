const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'a57b2dd842d221dd543c11459831e0eb6a4ea9729320f425499d34066d3661a6b9a034d25333a0cb34aa4a3fa4f5ea3529f6a0a2fda383b9c949dd567976b0a1';
const ADMIN_PASSWORD = 'admin123';

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ isAdmin: true }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ message: 'Invalid password' });
  }
});

module.exports = router;
