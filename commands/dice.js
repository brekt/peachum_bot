function rollDice () {
    const sides = 6;

    return Math.ceil(Math.random() * sides);
}

module.exports = rollDice;
