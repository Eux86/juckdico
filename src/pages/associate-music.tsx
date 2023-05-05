import React, { useState } from 'react';
import { useSaveData } from "../api";

function AssociateMusic() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('userId');
    const [musicId, setMusicId] = useState<string | undefined>();

    const {isLoading, error, saveData}= useSaveData()

    return (
        <>
            <div>Hello {userId}</div>
            <div>Select your music:</div>
            <input onChange={(event) => setMusicId(event.target.value)} type="text" />
            {userId && musicId &&
                <button onClick={() => saveData({serialNumber: userId, music: musicId})} type="button">save</button>
            }
            <div>isLoading: {isLoading ? '💭': '😴'}</div>
            <div>error: {JSON.stringify(error)}</div>
        </>
    )
}

export default AssociateMusic;