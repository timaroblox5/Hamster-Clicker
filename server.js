// server.js
const mongoose = require('mongoose');
const { handleDiscordAuth } = require('./assets/js/discordAuth'); // Import the function
const express = require('express');
const path = require('path');
const app = express();
const staticGzip = require('express-static-gzip'); // Add this line
const root = path.join(__dirname);

// Connect to MongoDB using the connection string from the environment variable
mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User model
const User = mongoose.model('User', new mongoose.Schema({
  discordId: String,
  username: String,
  // Other fields can be added here
}));

// Discord authentication route
app.get('/auth/discord', async (req, res) => {
  const code = req.query.code;
  await handleDiscordAuth(req, res, code);
});

// Static file serving with gzip compression options
const options = {
  enableBrotli: true, // Enable Brotli support for compression
  customCompressions: [{ encodingName: 'deflate', fileExtension: 'zz' }], // Additional compression settings
  orderPreference: ['br', 'gz'], // Compression order preference
  limit: '100kb' // File size limit
};

// Use staticGzip to serve the root directory
app.use('/', staticGzip(root, options));

// Serve HTML files on specific routes
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'clicker.html'));
});
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'mine.html'));
});
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'friends.html'));
});
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'earn.html'));
});

// Serve corresponding CSS files
app.get('/docs/clicker.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'clicker.css'));
});
app.get('/docs/mine.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'mine.css'));
});
app.get('/docs/friends.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'friends.css'));
});
app.get('/docs/earn.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'earn.css'));
});

// Fallback to index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
