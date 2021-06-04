import React, { useEffect, useState } from 'react'
import { Camera, VideoQrScanner } from './webcam-qr-scanner'

function DemoCustomVideoFilter() {
  const [qrCode, setQrCode] = useState('')
  const [shouldScan, setShouldScan] = useState(false)
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const [hueRotate, setHueRotate] = useState(0)

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setHueRotate((hueRotate) => (hueRotate + 1) % 360)
    })
    return () => cancelAnimationFrame(timer)
  }, [hueRotate])

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

          <Camera
            onVideo={setVideo}
            style={{
              filter: `hue-rotate(${hueRotate}deg) contrast(150%) saturate(3)`,
            }}
          />
          {video && <VideoQrScanner video={video} onQrCode={setQrCode} />}
        </>
      )}
    </>
  )
}

export default DemoCustomVideoFilter
