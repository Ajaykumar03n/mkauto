const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, college, department, year, reason } = req.body;
    if (!name || !email || !phone || !college || !department || !year) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const student = new Student({ name, email, phone, college, department, year, reason });
    await student.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
