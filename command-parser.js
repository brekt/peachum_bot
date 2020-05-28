const {
    dice
} = require('./commands');

function commandParser(client, command, target) {
  if (command === '!dice') {
    const num = dice();

    client.say(target, `You rolled a ${num}`);

    console.log(`* Executed ${command} command`);
  } else {
    console.log(`* Unknown command ${command}`);
  }
}

module.exports = commandParser;
