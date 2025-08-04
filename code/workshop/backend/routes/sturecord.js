const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Student schema/model (reuse if already defined elsewhere)
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

// GET /api/students - return all students
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // ✅ Use env variable

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// In your students.js route file:
router.get('/list', authenticateToken, async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ students });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
