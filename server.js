// server.js
const mongoose = require('mongoose');
const { handleDiscordAuth } = require('./assets/js/discordAuth'); // Import the function

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});