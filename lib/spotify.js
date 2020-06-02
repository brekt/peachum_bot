const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET
} = require('../constants');
const SpotifyWebApi = require('spotify-web-api-node');

const spotify = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/success'
});

async function authorize(code) {
    const authData = await spotify.authorizationCodeGrant(code);
    
    spotify.setCredentials({
        accessToken: authData.body.access_token,
        refreshToken: authData.body.refresh_token,
    });

    setInterval(refresh, 1000);

    console.log('Successfully authorized Spotify.');

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
