import type { Subtitle } from '../../utils/parse-SRT'
import { subtitleConfig } from '../../config/subtitle-config'

type SubtitleOverlayProps = {
  subtitles: Subtitle[]
  currentTime: number
}

export function SubtitleOverlay({ subtitles, currentTime }: SubtitleOverlayProps) {
  // Find current subtitle
  const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end)

  if (!currentSubtitle) {
    return null
  }

  // Lấy config
  const { bottomOffset, fontSize, background, padding } = subtitleConfig

  return (
    <div
      className="absolute left-0 right-0 w-full flex justify-center pointer-events-none z-10"
      style={{ bottom: bottomOffset }}
    >
      <div
        className="text-white text-center rounded max-w-[90%] md:max-w-[70%] lg:max-w-[60%] will-change-transform"
        style={{
          fontSize: fontSize,
          background: background,
          padding: padding,
          fontFamily: 'var(--font-sans)',
          textShadow: '0px 1px 2px rgba(0,0,0,0.8)',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.4'
        }}
        dangerouslySetInnerHTML={{ __html: currentSubtitle.text }}
      />
    </div>
  )
}
