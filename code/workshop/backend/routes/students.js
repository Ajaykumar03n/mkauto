const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const authenticateToken = require('../middleware/authenticate');

router.get('/list', authenticateToken, async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ students });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
