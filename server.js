// server.js
const mongoose = require('mongoose');
const { handleDiscordAuth } = require('./assets/js/discordAuth'); // Import the function
const express = require('express');
const path = require('path');
const app = express();
const staticGzip = require('express-static-gzip'); // Добавьте эту строку
const root = path.join(__dirname);

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

// Ограничение размера файла
const options = {
  enableBrotli: true, // Включить поддержку Brotli для сжатия
  customCompressions: [{ encodingName: 'deflate', fileExtension: 'zz' }], // Дополнительные настройки сжатия
  orderPreference: ['br', 'gz'], // Предпочтительность порядка сжатия
  limit: '100kb' // Лимит размера файла
};

app.use('/', staticGzip(root, options));


app.use(express.static(path.join(__dirname)));

// Обработка маршрутов для HTML и CSS файлов
app.get('/docs/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'clicker.html'));
});
app.get('/docs/clicker.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'clicker.css'));
});

app.get('/docs/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'mine.html'));
});
app.get('/docs/mine.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'mine.css'));
});

app.get('/docs/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'friends.html'));
});
app.get('/docs/friends.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'friends.css'));
});


app.get('/docs/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'earn.html'));
});
app.get('/docs/earn.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'earn.css'));
});

// Обработка любых других запросов через ./index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});