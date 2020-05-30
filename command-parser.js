const {
    dice,
    song
} = require('./commands');

function commandParser(client, command, target) {
  switch (command) {
    case '!dice':
      const num = dice();
      client.say(target, `You rolled a ${num}`);
      console.log(`* Executed ${command} command`);
      break;
    case '!song':
      const songData = song();
      break;
    default:
      console.log(`* Unknown command ${command}`);
  }
}

module.exports = commandParser;
