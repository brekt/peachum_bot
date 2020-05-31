const express = require('express');
const tmi = require('tmi.js');
const commandParser = require('./command-parser');
const {
  TMIJS_OPTIONS
} = require('./constants');

/**
 * Express Web Server
 */
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

/**
 * Twitch Bot Connection
 */
const client = new tmi.client(TMIJS_OPTIONS);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  const commands = ['!dice', '!song'];

  if (!commands.includes(msg.split(' ')[0])) { return; }

  const command = msg.trim();

  return commandParser(client, command, target);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}