# react-webcam-qr-scanner.ts

Typescript React components using pure javascript to detect QR Code from webcam continuously.

[![npm Package Version](https://img.shields.io/npm/v/react-webcam-qr-scanner.ts?maxAge=3600)](https://www.npmjs.com/package/react-webcam-qr-scanner.ts)

[Demo](https://react-webcam-qr-scanner-demo.surge.sh) hosted on surge.sh

## Features

- [x] Typescript Support
- [x] Auto-stop WebCam when component un-mount
- [x] Use back camera by default (configurable)
- [x] Support continuous/one-off scanning
- [x] Support custom video filter

## Installation

Step 1: Download the npm package

```bash
## using npm
npm install react-webcam-qr-scanner.ts qr-scanner

## or using yarn
yarn add react-webcam-qr-scanner.ts qr-scanner

## or using pnpm
pnpm install react-webcam-qr-scanner.ts qr-scanner
```

Step 2: Setup symbolic link to `qr-scanner-worker.min.js` and `qr-scanner-worker.min.js.map` under `public/`

You can obtain these files from `node_modules/qr-scanner/`

```bash
cd public
ln -s ../node_modules/qr-scanner/qr-scanner-worker.min.js
ln -s ../node_modules/qr-scanner/qr-scanner-worker.min.js.map
```

## Typescript Signature

```typescript
import { HTMLProps } from 'react'

export type CameraProps = HTMLProps<HTMLVideoElement> & {
  onVideo: (video: HTMLVideoElement) => void
  constraints?: MediaStreamConstraints
}
export function Camera(props: CameraProps): JSX.Element

export type VideoQrScannerProps = {
  onQrCode: (qrCode: string) => void
  video: HTMLVideoElement
}
export function VideoQrScanner(props: VideoQrScannerProps): JSX.Element

export function ContinuousQrScanner(props: QrScannerProps): JSX.Element
export function OneOffQrScanner(props: QrScannerProps): JSX.Element

export type QrScannerProps = Omit<CameraProps, 'onVideo'> &
  Pick<VideoQrScannerProps, 'onQrCode'>

export default OneOffQrScanner
```

## Usage Example

More examples refer to [Demo.tsx](./src/Demo.tsx)

### Demo One-Off Scanning

```typescript jsx
import React, { useState } from 'react'
import { OneOffQrScanner } from 'react-webcam-qr-scanner.ts'

function DemoOneOffScanning() {
  const [qrCode, setQrCode] = useState('')
  return (
    <>
      <p>
        QR Code: <code>{qrCode}</code>
      </p>
      {/* auto close the webcam once detected QR code */}
      <OneOffQrScanner
        onQrCode={setQrCode}
        hidden={false} /* optional: set true to hide the video-preview */
      />
    </>
  )
}

export default DemoOneOffScanning
```

Details refer to [DemoOneOffScanning.tsx](src/DemoOneOffScanning.tsx)

### Demo Continuous Scanning

```typescript jsx
import React, { useState } from 'react'
import { ContinuousQrScanner } from 'react-webcam-qr-scanner.ts'

function DemoContinuousScanning() {
  const [qrCode, setQrCode] = useState('')
  return (
    <>
      <p>
        QR Code: <code>{qrCode}</code>
      </p>
      {/* onQrCode can be fired multiple times */}
      <ContinuousQrScanner onQrCode={setQrCode} />
    </>
  )
}

export default DemoContinuousScanning
```

Details refer to [DemoContinuousScanning.tsx](src/DemoContinuousScanning.tsx):

### Demo Scanning with Custom Video Filter

```typescript jsx
import React, { useEffect, useState } from 'react'
import { Camera, VideoQrScanner } from 'react-webcam-qr-scanner.ts'

function DemoCustomVideoFilter() {
  const [qrCode, setQrCode] = useState('')
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const [hueRotate, setHueRotate] = useState(0)

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setHueRotate(hueRotate => (hueRotate + 1) % 360)
    })
    return () => cancelAnimationFrame(timer)
  }, [hueRotate])

  return (
    <>
      <p>
        QR Code: <code>{qrCode}</code>
      </p>
      <Camera
        onVideo={setVideo}
        style={{
          filter: `hue-rotate(${hueRotate}deg) contrast(150%) saturate(3)`,
        }}
      />
      {video && <VideoQrScanner video={video} onQrCode={setQrCode} />}
    </>
  )
}

export default DemoCustomVideoFilter
```

Details refer to [DemoCustomVideoFilter.tsx](src/DemoCustomVideoFilter.tsx):

## License

This is free and open-source software (FOSS) with
[BSD-2-Clause License](./LICENSE)
