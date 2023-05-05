import {useEffect, useState} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import {useSpotifyService} from "../../hooks/spotifyService/SpotifyService";

const ChooseMusic = () => {


  const { getToken} = useSpotifyService();
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>();

  const [query, setQuery] = useState('');


  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    getToken()
      .then(value => {
        setAccessToken(value)
        searchTracks(query, value).then(value2 => {
          console.log(value2)
          setTracks(value2)
          // playTrack(value2[0].uri, value);
        })
      })

  }, [query])


  async function searchTracks(query: string, accessToken: string): Promise<SpotifyApi.TrackObjectFull[]> {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
    const {tracks} = await spotifyApi.searchTracks(query, {limit: 1});
    return tracks.items;
  }

  const updateQuery = (e: any) => {
    setQuery(e.target.value)
  }

  return (
    <div>
      <div>
        <h2 style={{color:"white"}}>Search:</h2>
        <input value={query} onChange={updateQuery}/>
      </div>

      {query &&
          <iframe src={`https://open.spotify.com/embed/track/${tracks?.[0].uri.split(':')[2]}`} width="300" height="380"
                  frameBorder="0" allowTransparency={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>}

    </div>
  );
}

export {ChooseMusic}
