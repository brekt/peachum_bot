const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET
} = require('../constants');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000'
});

module.exports = spotifyApi;
