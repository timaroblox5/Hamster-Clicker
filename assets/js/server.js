const express = require('express');
const mongoose = require('mongoose');

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

// Replace: const fetch = require('node-fetch');
app.get('/auth/discord', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Authorization code is missing.');
  }
  
  try {
    const { default: fetch } = await import('node-fetch'); // Using dynamic import

    const tokenResponse = await fetch('https://discord.com/api/v8/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: '1260867202438139947',
        client_secret: 'HjPr92TcJ45Z1PeeJ7FhUG9B_Bix3-p3',
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: 'https://timaroblox5.github.io/hamsterclicker/web/game/',
        scope: 'identify',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
  });

    // Rest of the code

  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to process the request.');
  }
});