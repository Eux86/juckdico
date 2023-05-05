import React, { useCallback, useEffect, useState } from 'react';
import { useFetchUser } from "../api";
import QRCode from "qrcode.react";

type ScanEvent = {
    type: 'scan';
    payload: string;
}

type ErrorEvent = {
    type: 'error';
    message: string;
}

type NfcEvent = ErrorEvent | ScanEvent;

function RegisterQRCode({userId}: {userId: string}) {
    const registerUrl = `${window.location.origin}/associate?userId=${userId}`
    return (
        <>
            <div>you have to register: {registerUrl}</div>
            <div style={{ width: '200px', height: '200px' }}>
                <QRCode value={registerUrl} />
            </div>
        </>
    )
}

function MusicPlayer({userId}: {userId: string}) {
    const { data: user, isLoading, error,userNotFound } = useFetchUser(userId);

    return (
        <>
            <div>loading: {isLoading ? '💭' : '😴'}</div>
            <div>Music ID: {user?.music}</div>
            <div>Music Error: {error}</div>
            {userNotFound &&
                <RegisterQRCode userId={userId} />
            }
        </>
    )
}

function NfcLogin() {

    const [userId, setUserId] = useState<string | undefined>('unknown');
    const [error, setError] = useState<string | undefined>();
    const [started, setStarted] = useState<boolean>(false);

    const doScan = async (nfcEvent: (event: NfcEvent) => void) => {
        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            console.log("> Scan started");

            ndef.addEventListener("readingerror", () => {
                const message = "Argh! Cannot read data from the NFC tag. Try another one?";
                console.log(message);
                nfcEvent({type: 'error', message })
            });

            ndef.addEventListener("reading", (event: Event) => {
                const { serialNumber } = event as any;
                nfcEvent({type: 'scan', payload: serialNumber})
            });
        } catch (error) {
            const message = "Argh! " + error;
            console.log(message);
            nfcEvent({type: 'error', message})
        }
    }

    const start = useCallback (() => {
        doScan((event) => {
            switch (event.type) {
                case 'scan':
                    setUserId(event.payload);
                    setError(undefined);
                    break;
                case 'error':
                    setError(event.message);
                    // setUserId(undefined);
                    break;
            }
        });
        setStarted(true);
    },[]);

    useEffect(() => {
        start();
    }, [start])

    return (
        <>
            <div>User ID: {userId}</div>
            <div>NFC Error: {error}</div>
            {started
                ? <div>started...</div>
                : <button onClick={() => start()}>Start</button>
            }
            {userId &&
                <MusicPlayer userId={userId} />
            }
        </>
    )
}

export default NfcLogin;