const discord = require('../../commands/discord');
const { DISCORD_ID } = require('../../constants');

describe('discord.js', () => {
    describe('When the discord command is called', () => {
        // eslint-disable-next-line quotes
        it(`will return the streamer's discord id`, () => {
            const result = discord();

            expect(result).toBe(DISCORD_ID);
        });
    });
});
