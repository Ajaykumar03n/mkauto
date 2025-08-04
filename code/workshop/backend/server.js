require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');

const app = express();

// Middleware setup
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'https://registerform-flame.vercel.app/', // Change to your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Include credentials if needed
};
app.use(cors(corsOptions)); // Enable CORS for requests from frontend
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use('/api/auth', authRoutes);
const studentsRouter = require('./routes/students');
app.use('/api/students', studentsRouter);

const sturecordRouter = require('./routes/sturecord');
app.use('/api/sturecord', sturecordRouter);
app.use('https://git.new/pathToRegexpError', someRouter);
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

if (process.env.NODE_ENV === 'production') {
  // Serve frontend assets in production
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
