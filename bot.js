const tmi = require('tmi.js');
const commandParser = require('./command-parser');
require('dotenv').config();


const BOT_USERNAME = 'peachum_bot';
const OAUTH_TOKEN = process.env.OAUTH_TOKEN;
const CHANNEL_NAME = 'brekt';

// Define configuration options
const opts = {
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN
  },
  channels: [
    CHANNEL_NAME
  ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  const command = msg.trim();

  return commandParser(client, command, target);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}