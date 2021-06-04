import React, { useState } from 'react'
import { OneOffQrScanner } from './webcam-qr-scanner'

function DemoOneOffScanning() {
  const [qrCode, setQrCode] = useState('')
  const [shouldScan, setShouldScan] = useState(false)

  function startScanner() {
    setShouldScan(true)
  }
  function stopScanner() {
    setShouldScan(false)
  }
  function onQrCode(qrCode: string) {
    setQrCode(qrCode)
    setShouldScan(false)
  }

  return (
    <>
      <p>
        QR Code: <code>{qrCode}</code>
      </p>
      {!shouldScan ? (
        <button onClick={startScanner}>Scan QR Code</button>
      ) : (
        <>
          <button onClick={stopScanner}>Stop Scanning</button>
          {/* auto close the webcam once detected QR code */}
          <OneOffQrScanner
            onQrCode={onQrCode}
            hidden={false} /* optional: set true to hide the video-preview */
          />
        </>
      )}
    </>
  )
}

export default DemoOneOffScanning
