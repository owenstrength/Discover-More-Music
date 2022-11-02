require('dotenv').config()
const express = require("express");
const axios = require('axios');
const app = express();
var SpotifyWebApi = require('spotify-web-api-node');
const { json } = require('express');
const PORT = process.env.PORT || 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


// Handle logouts by deleting local storage
const logout = () => {
  // Clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  // Navigate to homepage
  window.location = window.location.origin;
};

// initialize spotify api
var spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
});

app.get("/", (req, res) => {
    res.send(`Hello World${req}`);
  });
 
// login to spotify 
app.get("/login", (req, res) => {
  const scopes = ['user-read-private', 'playlist-modify-private', 'user-top-read']

  res.redirect(spotifyApi.createAuthorizeURL(scopes));

});


app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  //get tokens from spotify login
  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );

        const queryParams = new URLSearchParams({
          access_token,
          refresh_token,
          expires_in,
        }).toString();

        // redirect to homepage
        
        res.redirect(`http://localhost:3000/?${queryParams}`);
      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];
        logout()
        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });


});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
