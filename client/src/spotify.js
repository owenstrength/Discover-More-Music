const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();


// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}
  
  // Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

// Access Token
const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
      };
    
      // If there is a valid access token in localStorage, use that
      if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken;
      }
    
      // If there is a token in the URL query params, user is logging in for the first time
      if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        // Store the query params in localStorage
        for (const property in queryParams) {
          window.localStorage.setItem(property, queryParams[property]);
        }
        // Set timestamp
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
        // Return access token from query params
        return queryParams[LOCALSTORAGE_KEYS.accessToken];
      }
    
      // We should never get here!
      return false;
  };

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
 export const logout = () => {
    // Clear all localStorage items
    for (const property in LOCALSTORAGE_KEYS) {
      window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    // Navigate to homepage
    window.location = window.location.origin;
  };

// Allows access to spotify api
export const accessToken = getAccessToken();
spotifyApi.setAccessToken(getAccessToken());

// Get info about user
export const getCurrentUserProfile = () => spotifyApi.getMe();

// Get users top 2 songs
var songs = async function getCurrentUserTopSongs() {
  let songList = [];
  await spotifyApi.getMyTopTracks({limit: 2, time_range: 'short_term'})
  .then(function(data) {
    var topSongs = data.body.items;
    songList.push(topSongs[0].id)
    songList.push(topSongs[1].id)
    //console.log('songs', songList)
  
  })
  console.log('songs', songList)
  return songList;
}();

// Get users top 3 artists
var artists = async function getCurrentUserTopArtists() {
  let artistList = [];
  await spotifyApi.getMyTopArtists({limit: 3, time_range: 'medium_term'})
  .then(function(data) {
    var topArtist = data.body.items;
    artistList.push(topArtist[0].id)
    artistList.push(topArtist[1].id)
    artistList.push(topArtist[2].id)
    //console.log('artist ', artistList)
  })
  console.log('artist ', artistList)
  return artistList;
}();

// Use spotify api to get reccomendations based on songs and artists
async function getCurrentUserRecommendations(acousticness, danceability, instrumentalness, energy, popularity) {
  console.log(songs)
  console.log(artists.length)
  let tracks_list = [];
  let tracks;
  await spotifyApi.getRecommendations({seed_artists: await artists, seed_tracks: await songs,
    target_acousticness: (acousticness/100), target_danceability: (danceability/100),
    target_instrumentalness: (instrumentalness/100), target_energy: (energy/100), target_popularity: popularity, limit: 30})
  .then(function(data) {
    console.log(data)
    tracks = data.body.tracks
  }, function(err) {
    console.log('Something went wrong getting new recommendations!', err);
  })
  tracks.forEach(element => tracks_list.push(element.uri));
  return tracks_list;
}

// Create a new playlist and add recomended tracks
export const createUserPlaylist = async function createUserPlaylist(acousticness, danceability, instrumentalness, energy, popularity){
    let tracks = await getCurrentUserRecommendations(acousticness, danceability, instrumentalness, energy, popularity)
    console.log('tracks: ', tracks)
    spotifyApi.createPlaylist("Discover More Music", {'public': false})
    .then(async function(data) {
      await spotifyApi.addTracksToPlaylist(data.body.id, tracks)
      // log link to playlist
      console.log(data.body.external_urls.spotify);
      window.open(data.body.external_urls.spotify, "_blank")


    })
};