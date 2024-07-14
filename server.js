// server.js
const mongoose = require('mongoose');
const { handleDiscordAuth } = require('./assets/js/discordAuth'); // Import the function
const express = require('express');
const path = require('path');
const app = express();

mongoose.connect('mongodb+srv://BFFBOT:LLq-7NW-adG-e44@bffbot.hr7tpgj.mongodb.net/BFFBOT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', new mongoose.Schema({
  discordId: String,
  username: String,
  // Other fields
}));

app.get('/auth/discord', async (req, res) => {
  const code = req.query.code;

  // Call the function from discordAuth.js
  await handleDiscordAuth(req, res, code);
});

// Define the route for /web/authorize/
app.get('/web/authorize/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'authorize', 'index.html'));
});



// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'web')));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});