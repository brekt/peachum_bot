require('dotenv').config();

const BOT_USERNAME = 'peachum_bot';
const CHANNEL_NAME = 'brekt';
const OAUTH_TOKEN = process.env.OAUTH_TOKEN;
const SPOTIFY_CLIENT_ID = '88e5b0cbce064ac28f5a7d3ccf0f47c1';
const SPOTIFY_CLIENT_SECRET = '933a932777a94762ae17b5fe50db2ab0';


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
    OAUTH_TOKEN,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    TMIJS_OPTIONS
};
