const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI
} = require('../constants');
const SpotifyWebApi = require('spotify-web-api-node');

const spotify = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUri: SPOTIFY_REDIRECT_URI
});

async function authorize(code) {
    const authData = await spotify.authorizationCodeGrant(code);

    console.log('Successfully authorized Spotify.');

    spotify.setCredentials({
        accessToken: authData.body.access_token,
        refreshToken: authData.body.refresh_token,
    });

    setInterval(refresh, 3500000);

    return true;
}

async function refresh() {
    try {
        const { body: { access_token: accessToken } } = await spotify.refreshAccessToken();

        spotify.setCredentials({
            accessToken
        });
    } catch (err) {
        console.error('Error refreshing Spotify access token:', err);
    }
}

module.exports = {
    authorize,
    refresh,
    spotify
};
