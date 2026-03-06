import React, { useState } from 'react'
import type { Subtitle } from '../utils/parse-SRT'
import { YouTubePlayer } from '../components/player/YouTubePlayer'
import { SubtitleUploader } from '../components/player/SubtitleUploader'
import { storage } from '../utils/local-storage'

const DEFAULT_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

export function HomePage() {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([])
  const [youtubeUrl, setYoutubeUrl] = useState<string>(() =>
    storage.getOrDefault('youtube-player:last-url', DEFAULT_URL)
  )

  const handleUploadSuccess = (uploadedSubtitles: Subtitle[]) => {
    setSubtitles(uploadedSubtitles)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setYoutubeUrl(url)
    storage.set('youtube-player:last-url', url)
  }

  return (
    <main>
      {/* Input URL Section */}
      <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 w-full">
          <label htmlFor="youtube-url" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            YouTube Video URL
          </label>
          <input
            id="youtube-url"
            type="text"
            value={youtubeUrl}
            onChange={handleUrlChange}
            placeholder="Nhập đường dẫn YouTube tại đây (vd: https://youtube.com/watch?v=...)"
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-(--vcn-main-cl) focus:border-transparent transition-all"
          />
        </div>
      </section>

      {/* Player Section */}
      <section className="w-full max-w-4xl mx-auto">
        <YouTubePlayer url={youtubeUrl} subtitles={subtitles} />
      </section>

      {/* Uploader Section */}
      <section>
        <SubtitleUploader onUploadSuccess={handleUploadSuccess} />
      </section>
    </main>
  )
}
