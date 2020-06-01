const {
    dice,
    song
} = require('./commands');

async function commandParser(client, command, target) {
switch (command) {
    case '!dice':
        const num = dice();

        return client.say(target, `You rolled a ${num}`);
    case '!song':
        const songData = await song();

        return client.say(target, `Currently playing song: ${JSON.stringify(songData)}`);
    default:
        console.log(`* Unknown command ${command}`);
        
        return client.say(target, 'Wut?');
    }
}

module.exports = commandParser;
