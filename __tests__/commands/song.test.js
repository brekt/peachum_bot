const songFunctions = require('../../commands/song');
const mockSongData = require('../../__mocks__/mock-song-data.json');

describe('song.js', () => {
    describe('song', () => {
        it('will return a chatResponse string', async () => {
            /**
             *  const artistName = _get(songData, 'item.artists[0].name', '');
                const songName = _get(songData, 'item.name', '');
                const trackLength = _get(songData, 'item.duration_ms');
                const albumName = _get(songData, 'item.album.name', '');
                const releaseDate = _get(songData, 'item.album.release_date', '');
                const precision = _get(songData, 'item.album.release_date_precision', '');
             */

            songFunctions.getSongData = jest.fn().mockResolvedValue({ body: mockSongData });
            const chatResponse = await songFunctions.song();

            expect(typeof chatResponse).toBe('string');
        });
    });
});