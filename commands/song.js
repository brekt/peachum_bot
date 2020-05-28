const fetch = require('node-fetch');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_TOKEN } = require('../constants');

const authUrl = 'https://accounts.spotify.com/authorize';
const songUrl = 'https://api.spotify.com/v1/me/player/currently-playing';
const scope = 'user-read-currently-playing user-read-playback-state';
const redirectUri = 'https://twitch.tv';


/*
curl -X "GET" "https://api.spotify.com/v1/me/player/currently-playing" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQDOLmrDK8Fao2SUx9y_HOQmG1ffeRqd9y1UL8Se2a7uAmNQKRWwVQTAttzHOQi54Ib-RiH0k_pvAfHkj47yULFhj3QlWv27pJEmTZZm9kKcJG97tva9zpgAJPCyMpEZCyQ21cOiBHZG_wAJ-A"
*/

const params = new URLSearchParams();
params.append('grant_type', 'client_credentials');


const fetchOptions = {
    auth: {
        method: 'POST',
        body: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64AuthString}`
        }
    },
    song: {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SPOTIFY_TOKEN}`
        }
    }
};

(async () => {
    song();
})();

async function getToken() {
    const url = `${authUrl}?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
    try {
        const response = await fetch(url, fetchOptions.auth);
        const result = await response.json();

        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

async function song() {
    try {
        const response = await fetch(songUrl, fetchOptions.song);
        const result = await response.json();
    
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = song;