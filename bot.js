const tmi = require('tmi.js');
const commandParser = require('./command-parser');
const constants = require('./constants');

const client = new tmi.client(constants.TMIJS_OPTIONS);

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