require('dotenv').config();

const BOT_USERNAME = 'peachum_bot';
const CHANNEL_NAME = 'brekt';
const EXPRESS_PORT = 3000;
const OAUTH_TOKEN = process.env.OAUTH_TOKEN;
const SPOTIFY_CLIENT_ID = '88e5b0cbce064ac28f5a7d3ccf0f47c1';
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URL = 'http://localhost:3000/success';


const TMIJS_OPTIONS = {
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN
  },
  channels: [
    CHANNEL_NAME
  ]
};

module.exports = {
    BOT_USERNAME,
    CHANNEL_NAME,
    EXPRESS_PORT,
    OAUTH_TOKEN,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URL,
    TMIJS_OPTIONS
};
