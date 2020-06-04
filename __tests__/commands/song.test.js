const songFunctions = require('../../commands/song');
const mockSongData = require('../../__mocks__/mock-song-data.json');

describe('the song module', () => {
    beforeEach(() => {
        console.error.mockRestore && console.error.mockRestore();
    });

    describe('when getting chat response message', () => {
        it('will return a chatResponse string', async () => {
            songFunctions.getSongData = jest.fn().mockResolvedValue(mockSongData);
            const chatResponse = await songFunctions.song();

            expect(chatResponse).toBe('The currently playing song is "Children of the Moon" by The Alan Parsons Project from the album Eye In The Sky (Expanded Edition). It was released in 1982. The track length is 4:51.');
        });
    
        it('will log an error if an exception occurs', async () => {
            songFunctions.getSongData = jest.fn().mockRejectedValue({});
            console.error = jest.fn();
            await songFunctions.song();

            songFunctions.getSongData.mockRestore();

            expect(console.error).toHaveBeenCalled();
        });

        describe('when getting song data', () => {
            xit('will call a spotify API method', async () => {
                songFunctions.getMyCurrentPlaybackState = jest.fn().mockResolvedValue({});
                await songFunctions.getSongData();

                expect(songFunctions.getMyCurrentPlaybackState).toHaveBeenCalled();
            });
        });
    });
});
