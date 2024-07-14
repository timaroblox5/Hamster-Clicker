// discordAuth.js
const fetch = require('node-fetch');

async function handleDiscordAuth(req, res, code) {
  if (!code) {
    return res.status(400).send('Authorization code is missing.');
  }

  try {
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
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  
    // Add a console log to inspect the response
    console.log('Token response status:', tokenResponse.status);
    console.log('Token response data:', await tokenResponse.json());
  
    // Rest of the code
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to process the request.');
  }
}

module.exports = {
  handleDiscordAuth,
};