const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ IMPORT CORS
const authRoutes = require('./routes/auth');
const registerRoutes = require('./routes/register');
const studentRoutes = require('./routes/students');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// ✅ Setup CORS
const corsOptions = {
  origin: 'https://registerform-flame.vercel.app', // Your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies or Authorization headers
};
app.use(cors(corsOptions));

app.use(express.json());
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', registerRoutes);
app.use('/api/students', studentRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
