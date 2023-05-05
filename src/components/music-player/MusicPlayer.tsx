import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import {useSpotifyService} from "../../hooks/spotifyService/SpotifyService";
import {useFetchUser} from "../../api";
import {RegisterQRCode} from "../register-qr-code/RegisterQRCode";
import diconiumLogo from '../../icons/diconium.svg'
import classes from './MusicPlayer.module.css'

const MusicPlayer = ({userId}: {userId: string}) => {

  const { data: user, isLoading, error,userNotFound } = useFetchUser(userId);

  const {getToken, getTrack, searchTracks} = useSpotifyService();

  const [previewUrl, setPreviewUrl] = useState<string>();

  const [trackId, setTrackId] = useState<string>('1Yk0cQdMLx5RzzFTYwmuld');

  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>();

  const [query, setQuery] = useState('');


  useEffect(() => {
    getToken().then((value) => {

      getTrack(trackId).then(value => {
        setPreviewUrl(value.preview_url);
      })

      searchTracks('ola', value).then(value1 => {
        setTracks(value1)
      });


    })

  }, [])




  return (
    <div className={classes['music-player']}>
      <img src={diconiumLogo} width={300} height={300} className={'diconiumLogo'}/>

      {/*<div>loading: {isLoading ? '💭' : '😴'}</div>*/}
      {/*<div>Music ID: {user?.music}</div>*/}
      {/*<div>Music Error: {error}</div>*/}

      {userNotFound ?
          <RegisterQRCode userId={userId} />
        :
        <>
          Music ID: {JSON.stringify(user)}
          <iframe
            // src={`https://open.spotify.com/embed/track/${tracks?.[0].uri.split(':')[2]}`}
            width="300" height="380"
                  frameBorder="0" allowTransparency={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        </>
      }

    </div>
  );
};

export default MusicPlayer;
