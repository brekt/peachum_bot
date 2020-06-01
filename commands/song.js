const { promisify } = require('util');
const { spotify } = require('../lib/spotify');

async function song() {
    try {
        const songData = await getSongData();

        return songData;
    } catch (err) {
        console.error('Error getting song data:', err);
    }
}

async function getSongData() {
    // return promisify(spotify.getMyCurrentPlaybackState.bind(spotify))({ market: 'US' });
    return spotify.getMyCurrentPlaybackState({ market: 'US' }, (err, data) => {
        if (err) { return err; }

        return data;
    });
}

module.exports = song;