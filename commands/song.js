const { promisify } = require('util');
const _get = require('lodash/get');
const { spotify } = require('../lib/spotify');

async function song() {
    try {
        const songData = await getSongData();
        const chatResponse = buildResponse(songData);

        return chatResponse;
    } catch (err) {
        console.error('Error getting song data:', err);
    }
}

async function getSongData() {
    try {
        const data = await promisify(spotify.getMyCurrentPlaybackState.bind(spotify))({ market: 'US' });

        return data.body;
    } catch (err) {
        console.error('Error getting song data:', err);
    }
}

function buildResponse(songData = {}) {
    const artistName = _get(songData, 'item.artists[0].name', '');
    const songName = _get(songData, 'item.name', '');
    const trackLength = _get(songData, 'item.duration_ms');
    const albumName = _get(songData, 'item.album.name', '');
    const releaseDate = _get(songData, 'item.album.release_date', '');
    const precision = _get(songData, 'item.album.release_date_precision', '');

    return `The currently playing song is "${songName}" by ${artistName} from the album ${albumName}. It was released in ${formatReleaseDate(releaseDate, precision)}. The track length is ${formatTrackLength(trackLength)}.`;
}

function formatTrackLength(ms = 0) {
    const seconds = ms / 1000;
    const minutes = Math.floor(seconds / 60);
    const leftOverseconds = Math.round(seconds - (minutes * 60));

    return `${minutes}:${leftOverseconds}`;
}

function formatReleaseDate(date = '', precision = '') {
    switch (precision) {
        case 'year':
            return date;
        case 'day':
            return date.slice(0, 4);
        default:
            return '';
    }
}

module.exports = song;