const { dice, discord, song } = require('./commands');
const { PEACHUM_URL } = require('./constants');

async function commandParser(client, command = '', target = '') {
    switch (command) {
        case '!dice': {
            const num = dice();

            return client.say(target, `You rolled a ${num}`);
        }
        case '!discord': {
            const discordId = discord();

            return client.say(target, `brekt's discord id is ${discordId}`);
        }
        case '!repo': {
            return client.say(target, `I'm open source: ${PEACHUM_URL}`);
        }
        case '!song': {
            const songInfo = await song();

            if (songInfo) {
                return client.say(target, songInfo);
            }

            return;
        }
        default:
            console.log(`Unknown command ${command}`);

            return client.say(target, 'Wut?');
    }
}

module.exports = commandParser;
