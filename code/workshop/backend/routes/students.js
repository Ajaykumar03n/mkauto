const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  college: String,
  department: String,
  year: String,
  reason: String
});
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

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
