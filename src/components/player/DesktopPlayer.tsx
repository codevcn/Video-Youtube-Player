import { useState, useRef, useEffect } from 'react'
import React from 'react'
import ReactPlayer from 'react-player'
import { SubtitleOverlay } from './SubtitleOverlay'
import type { Subtitle } from '../../utils/parse-SRT'
import { Icon } from '../common/Icon'

type DesktopPlayerProps = {
  url: string
  subtitles: Subtitle[]
}

export function DesktopPlayer({ url, subtitles }: DesktopPlayerProps) {
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

  return (
    <div
      ref={containerRef}
      className={`mobile:block hidden relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group border border-zinc-800`}
    >
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
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md text-xs text-white/80 border border-white/10 opacity-0 group-hover:opacity-100 tracking-wide transition-opacity duration-300 pointer-events-none">
          Chưa upload subtitle
        </div>
      )}

      <button
        onClick={handleFullscreenToggle}
        title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        className="absolute bottom-1 right-2 z-20 cursor-pointer bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-md p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10"
      >
        <Icon name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} size={18} />
      </button>
    </div>
  )
}
