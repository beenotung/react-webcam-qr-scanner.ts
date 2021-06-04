import QrScannerEngine from 'qr-scanner'
import React, { HTMLProps, useEffect, useMemo, useState } from 'react'

export type CameraProps = HTMLProps<HTMLVideoElement> & {
  onVideo: (video: HTMLVideoElement) => void
  constraints?: MediaStreamConstraints
}

export function Camera(props: CameraProps) {
  const { onVideo, constraints, ...videoProps } = props
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)

  const streamPromise = useMemo(
    () =>
      navigator.mediaDevices.getUserMedia(
        constraints || { video: { facingMode: 'environment' }, audio: false },
      ),
    [constraints],
  )
  useMemo(() => {
    streamPromise.catch((err) =>
      console.error('failed to get user media:', err),
    )
  }, [streamPromise])

  useEffect(() => {
    streamPromise.then((stream) => {
      if (!video) {
        return
      }
      video.srcObject = stream
      video.onloadedmetadata = () => {
        video.play()
        onVideo(video)
      }
    })
    return () => {}
  }, [video, streamPromise, onVideo])

  useEffect(() => {
    return () => {
      streamPromise.then((stream) => {
        stream.getVideoTracks().forEach((track) => stream.removeTrack(track))
      })
    }
  }, [streamPromise])

  return <video {...videoProps} ref={setVideo}></video>
}

export type VideoQrScannerProps = {
  onQrCode: (qrCode: string) => void
  video: HTMLVideoElement
}

export function VideoQrScanner(props: VideoQrScannerProps) {
  const { video, onQrCode } = props

  useEffect(() => {
    const qrScanner = new QrScannerEngine(video, onQrCode)
    qrScanner.start()
    return () => {
      qrScanner.stop()
    }
  }, [video, onQrCode])

  return <></>
}

export type QrScannerProps = Omit<CameraProps, 'onVideo'> &
  Pick<VideoQrScannerProps, 'onQrCode'>

export function ContinuousQrScanner(props: QrScannerProps) {
  const { onQrCode, ...videoProps } = props
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  return (
    <>
      <Camera onVideo={setVideo} {...videoProps} />
      {video && <VideoQrScanner video={video} onQrCode={onQrCode} />}
    </>
  )
}

export function OneOffQrScanner(props: QrScannerProps) {
  const { onQrCode, ...videoProps } = props
  const [hasShown, setHasShown] = useState(false)
  function oneOffOnQrCode(qrCode: string) {
    onQrCode(qrCode)
    setHasShown(true)
  }
  if (hasShown) {
    return <></>
  }
  return <ContinuousQrScanner onQrCode={oneOffOnQrCode} {...videoProps} />
}

export default OneOffQrScanner
