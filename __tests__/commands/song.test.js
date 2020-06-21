const songFunctions = require('../../commands/song');
const mockSongData = require('../../__mocks__/mock-song-data.json');

describe('the song module', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('when getting chat response message', () => {
        it('will return a chatResponse string', async () => {
            songFunctions.getSongData = jest
                .fn()
                .mockResolvedValue(mockSongData);
            const chatResponse = await songFunctions.song();

            expect(chatResponse).toBe(
                'The currently playing song is "Children of the Moon" by The Alan Parsons Project from the album Eye In The Sky (Expanded Edition). It was released in 1982. The track length is 4:51.'
            );
        });

        it('will console.error if an error occurs when getting a song', async () => {
            console.error = jest.fn();
            songFunctions.getSongData = jest.fn().mockRejectedValue({});

            await songFunctions.song(false);

            expect(console.error).toHaveBeenCalled();
        });

        xit('will log an error if an exception occurs', async () => {
            songFunctions.getSongData = jest.fn().mockRejectedValue({});
            console.error = jest.fn();
            await songFunctions.song();

            songFunctions.getSongData.mockRestore();

            expect(console.error).toHaveBeenCalled();
        });

        describe('when getting song data', () => {
            xit('will call a spotify API method', async () => {
                songFunctions.getMyCurrentPlaybackState = jest
                    .fn()
                    .mockResolvedValue({});
                await songFunctions.getSongData();

                expect(
                    songFunctions.getMyCurrentPlaybackState
                ).toHaveBeenCalled();
            });
        });

        describe('when formatting a release date', () => {
            /*
                formatReleaseDate: (date = '', precision = '') => {
                    switch (precision) {
                        case 'year':
                            return date;
                        case 'day':
                            return date.slice(0, 4);
                        default:
                            return '';
                    }
                },
            */
            it('will just return the date passed of the precision is year', () => {
                const date = '1999';
                const precision = 'year';

                const formattedDate = songFunctions.formatReleaseDate(
                    date,
                    precision
                );

                expect(formattedDate).toBe(date);
            });

            it('will return the first 4 digits of a date of the format is day', () => {
                const date = '1999-nonsense-string';
                const precision = 'day';

                const formattedDate = songFunctions.formatReleaseDate(
                    date,
                    precision
                );

                expect(formattedDate).toBe('1999');
            });
        });
    });
});
