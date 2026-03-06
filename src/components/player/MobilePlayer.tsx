import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { SubtitleOverlay } from './SubtitleOverlay'
import type { Subtitle } from '../../utils/parse-SRT'
import { Icon } from '../common/Icon'

type MobilePlayerProps = {
  url: string
  subtitles: Subtitle[]
}

export function MobilePlayer({ url, subtitles }: MobilePlayerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime)
  }

  const handleFullscreenToggle = () => {
    if (isFullscreen) {
      document.exitFullscreen()
    } else {
      containerRef.current?.requestFullscreen()
    }
  }

  const containerClass = isFullscreen
    ? 'relative w-full aspect-video bg-black overflow-hidden shadow-2xl group border border-zinc-800 m-auto'
    : 'relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800'

  return (
    <div className={`mobile:hidden flex w-full ${isFullscreen ? '' : 'px-6'}`} ref={containerRef}>
      <div className={containerClass}>
        <ReactPlayer
          src={url}
          width="100%"
          height="100%"
          controls={true}
          onTimeUpdate={handleTimeUpdate}
          config={{
            youtube: {
              rel: 0,
              fs: 0
            }
          }}
        />

        {subtitles.length > 0 ? (
          <SubtitleOverlay subtitles={subtitles} currentTime={currentTime} />
        ) : (
          !isFullscreen && (
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs text-white/70 border border-white/10 pointer-events-none">
              Chưa upload subtitle
            </div>
          )
        )}

        {/* Nút mở rộng / thu nhỏ — luôn hiển thị trên mobile */}
        <button
          onClick={handleFullscreenToggle}
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          className="NAME-custom-fullscreen-button absolute bottom-1 right-3 z-20 bg-black/60 active:bg-black/90 backdrop-blur-md text-white rounded-md p-1.5 border border-white/10"
        >
          <Icon name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} size={18} />
        </button>
      </div>
    </div>
  )
}
