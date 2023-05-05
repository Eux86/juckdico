import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPlayer from "spotify-web-playback";
import axios from "axios";

const useSpotifyService = () => {

  const clientId = '7a62d0ac3c87448eaa6003625a33a344'
  const clientSecret = 'cb7eba71a5d642bda9b2203d635bde8f'

  const spotifyApi = new SpotifyWebApi();

  const getTrack = async (trackId: string) => {
    return await spotifyApi.getTrack(trackId);
  }

  const getToken = async () => {
    const authEndpoint = "https://accounts.spotify.com/api/token";

    const response = await axios.post(authEndpoint, null, {
      params: {
        grant_type: "client_credentials",
      },
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.access_token;
  };

  async function searchTracks(query: string, accessToken: string): Promise<SpotifyApi.TrackObjectFull[]> {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
    const {tracks} = await spotifyApi.searchTracks(query, {limit: 3});
    return tracks.items;
  }


  return {getTrack, getToken, searchTracks}
}

export {useSpotifyService}

