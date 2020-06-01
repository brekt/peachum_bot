const { promisify } = require('util');
const { spotify } = require('../lib/spotify');

async function song() {
    try {
        const songData = await getSongData();

        console.log('songData:', songData);

        return songData;
    } catch (err) {
        console.error('Error getting song data:', err);
    }
}

async function getSongData() {
    try {
        const data = await spotify.getMyCurrentPlaybackState({ market: 'US' });

        console.log(data);
    
        return data.body;
    } catch (err) {
        console.error('Error getting song data:', err);
    }
}

module.exports = song;