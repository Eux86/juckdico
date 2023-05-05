import QRCode from "qrcode.react";
import React from "react";

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

export {RegisterQRCode}
