const dice = require('../../commands/dice');

describe('dice.js', () => {
    describe('When rolling dice', () => {
        it('will return a number', () => {
            const result = dice();

            expect(typeof result).toBe('number');
        });
    });
});