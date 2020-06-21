require('dotenv').config();

const BOT_USERNAME = 'peachum_bot';
const CHANNEL_NAME = 'brekt';
const DISCORD_ID = 'brekt#5434';
const EXPRESS_PORT = 4444;
const OAUTH_TOKEN = process.env.OAUTH_TOKEN;
const PEACHUM_URL = 'https://github.com/brekt/peachum_bot';
const SPOTIFY_CLIENT_ID = '913cb7d8253e4eda9bd78b94e80b78c6';
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = 'http://localhost:4444/success';

const TMIJS_OPTIONS = {
    identity: {
        username: BOT_USERNAME,
        password: OAUTH_TOKEN,
    },
    channels: [CHANNEL_NAME],
};

module.exports = {
    BOT_USERNAME,
    CHANNEL_NAME,
    EXPRESS_PORT,
    DISCORD_ID,
    OAUTH_TOKEN,
    PEACHUM_URL,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI,
    TMIJS_OPTIONS,
};
