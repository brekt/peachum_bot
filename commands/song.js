const spotify = require('../lib/spotify');

async function song() {
    try {
        const songData = await spotify.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE');
        console.log(songData);
    } catch (err) {
        console.error(err);
    }
}

module.exports = song;