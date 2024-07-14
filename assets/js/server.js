const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://BFFBOT:LLq-7NW-adG-e44@bffbot.hr7tpgj.mongodb.net/?retryWrites=true&w=majority&appName=BFFBOT', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  discordId: String,
  username: String,
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

app.get('/auth/discord', async (req, res) => {
  const code = req.query.code;
  if (code) {
    try {
      const tokenResponse = await fetch('https://discord.com/api/v8/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
          client_id: '1260867202438139947',
          client_secret: 'HjPr92TcJ45Z1PeeJ7FhUG9B_Bix3-p3',
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://127.0.0.1:5500/web/game/', // Замените на свой URL
          scope: 'identify'
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const tokenData = await tokenResponse.json();

      const userResponse = await fetch('https://discord.com/api/v8/users/@me', {
        headers: {
          authorization: `${tokenData.token_type} ${tokenData.access_token}`
        }
      });
      const userInfo = await userResponse.json();

      // Render the HTML using EJS with the user information
      const renderedHtml = await ejs.renderFile('template.ejs', { username: userInfo.username, avatar: `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png` });

      res.send(renderedHtml);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to fetch user data from Discord.');
    }
  } else {
    res.status(400).send('Authorization code is missing.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  });