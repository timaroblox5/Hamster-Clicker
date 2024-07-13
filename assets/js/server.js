const fetch = require('node-fetch');
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
// Допустим, у вас есть переменная discordClientId, содержащая идентификатор вашего приложения Discord
// и переменная discordClientSecret, содержащая секрет вашего приложения Discord

app.get('/auth/discord', async (req, res) => {
  const code = req.query.code;
  if (code) {
    try {
      // Обмен кода авторизации на токен доступа
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
          'Content-Type': 'application/json'
        }
      });
      const tokenData = await tokenResponse.json();

      const userResponse = await fetch('https://discord.com/api/v8/users/@me', {
        headers: {
          authorization: `${tokenData.token_type} ${tokenData.access_token}`
        }
      });
      const userInfo = await userResponse.json();

      const existingUser = await User.findOne({ discordId: userInfo.id });
      if (existingUser) {
        await existingUser.updateOne({ username: userInfo.username /* other fields */ });
      } else {
        const newUser = new User({
          discordId: userInfo.id,
          username: userInfo.username,
          // Add other fields as needed
        });
        await newUser.save();
      }

      res.send('User data successfully saved.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to save user data.');
    }
  } else {
    res.status(400).send('Authorization code is missing.');
  }
});