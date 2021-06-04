import React, { useState } from 'react'
import { ContinuousQrScanner } from './webcam-qr-scanner'

function DemoContinuousScanning() {
  const [qrCode, setQrCode] = useState('')
  const [shouldScan, setShouldScan] = useState(false)

  function startScanner() {
    setShouldScan(true)
  }
  function stopScanner() {
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
          {/* onQrCode can be fired multiple times */}
          <ContinuousQrScanner onQrCode={setQrCode} />
        </>
      )}
    </>
  )
}

export default DemoContinuousScanning
