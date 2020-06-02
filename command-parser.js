const {
    dice,
    song
} = require('./commands');
const { PEACHUM_URL } = require('./constants');

async function commandParser(client, command, target) {
    switch (command) {
        case '!dice': {
            const num = dice();

            return client.say(target, `You rolled a ${num}`);
        }
        case '!repo': {

            return client.say(target, `I'm open source: ${PEACHUM_URL}`);
        }
        case '!song': {
            const songInfo = await song();

            return client.say(target, songInfo);
        }
        default:
            console.log(`* Unknown command ${command}`);
            
            return client.say(target, 'Wut?');
    }
}

module.exports = commandParser;
