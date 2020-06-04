const { promisify } = require('util');
const _get = require('lodash/get');
const { spotify } = require('../lib/spotify');

/**
 * Placing this here so it can be exported and tested.
 * The promisification makes it work consistently, and
 * the binding is necessary because it uses the `this`
 * keyword. Test currently failing and skipped though. :(
 */
const getMyCurrentPlaybackState = promisify(spotify.getMyCurrentPlaybackState.bind(spotify));

const songFunctions = {

    lastTimeRun: Date.now(),

    song: async () => {
        if (Date.now() - this.lastTimeRun <  10000) { return; }

        try {
            const songData = await songFunctions.getSongData();
            const chatResponse = songFunctions.buildResponse(songData);
    
            this.lastTimeRun = Date.now();

            return chatResponse;
        } catch (err) {
            this.lastTimeRun = Date.now();

            console.error('Error getting song data:', err);
        }
    },

    getMyCurrentPlaybackState, // created up above

    getSongData: async () => {
        try {
            const data = await songFunctions.getMyCurrentPlaybackState({ market: 'US' });
    
            return data.body;
        } catch (err) {
            console.error('Error getting song data:', err);
    
            throw err;
        }
    },

    buildResponse: (songData = {}) => {
        const artistName = _get(songData, 'item.artists[0].name', '');
        const songName = _get(songData, 'item.name', '');
        const trackLength = _get(songData, 'item.duration_ms');
        const albumName = _get(songData, 'item.album.name', '');
        const releaseDate = _get(songData, 'item.album.release_date', '');
        const precision = _get(songData, 'item.album.release_date_precision', '');
    
        return `The currently playing song is "${songName}" by ${artistName} from the album ${albumName}. It was released in ${songFunctions.formatReleaseDate(releaseDate, precision)}. The track length is ${songFunctions.formatTrackLength(trackLength)}.`;
    },

    formatTrackLength: (ms = 0) => {
        const seconds = ms / 1000;
        const minutes = Math.floor(seconds / 60);
        const leftOverseconds = Math.round(seconds - (minutes * 60));
    
        return `${minutes}:${leftOverseconds}`;
    },

    formatReleaseDate: (date = '', precision = '') => {
        switch (precision) {
            case 'year':
                return date;
            case 'day':
                return date.slice(0, 4);
            default:
                return '';
        }
    }
};

module.exports = songFunctions;