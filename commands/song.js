const { promisify } = require('util');
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
        const data = await spotify.getMyCurrentPlaybackState({ market: 'US' });
    
        return data.body;
    } catch (err) {
        console.error('Error getting song data:', err);
    }
}

function buildResponse(songData = {}) {
    
    const artistName = songData?.item?.artists?.[0]?.name || '';
    const songName = songData?.item?.name || '';
    const trackLength = songData?.item?.duration_ms || '';
    const albumName = songData?.item?.album?.name || '';
    const releaseDate = songData?.item?.album?.release_date || ''; // get year regardless of format

    return `The currently playing song is "${songName}" by ${artistName} from the album ${albumName}. It was released in ${formatReleaseDate(releaseDate)}. The track length is ${formatTrackLength(trackLength)}.`;
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
            break;
        case 'day':
            return date.slice(0, 4)
        default:
            return '';
    }
}

module.exports = song;