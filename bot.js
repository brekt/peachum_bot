const express = require('express');
const tmi = require('tmi.js');
const { authorize  } = require('./lib/spotify');
const commandParser = require('./command-parser');
const {
    COMMAND_LIST,
    EXPRESS_PORT,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_REDIRECT_URL,
    TMIJS_OPTIONS
} = require('./constants');

/**
 * Express Web Server For Spotify Authentication
 */
const app = express();

app.get('/', (req, res) => {
    const scopes = encodeURIComponent('user-read-email user-read-playback-state');
    const redirectUri = encodeURIComponent(SPOTIFY_REDIRECT_URL);
    const authUrl = 'https://accounts.spotify.com/authorize';

    res.redirect(`${authUrl}?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectUri}`);
});

app.get('/success', async (req, res) => {
    await authorize(req.query.code);

    res.send('<h1>Successful Authentication</h1>');
});

app.listen(EXPRESS_PORT, () => console.log(`Express server listening at http://localhost:${EXPRESS_PORT}`));

/**
 * Twitch Bot Connection
 */
const client = new tmi.client(TMIJS_OPTIONS);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    if (!COMMAND_LIST.includes(msg.split(' ')[0])) { return; }

    const command = msg.trim();

    return commandParser(client, command, target);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}