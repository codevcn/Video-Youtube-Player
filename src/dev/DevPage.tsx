import { useRef } from 'react'
import ReactPlayer from 'react-player'

export const DevPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const testFullscreen = () => {
    if (ref.current) {
      ref.current.requestFullscreen()
    }
  }

  return (
    <div className="p-6 bg-pink-200" ref={ref}>
      <h1 className="text-2xl font-bold mb-4">Development Page</h1>
      {/* <video src="https://youtu.be/EKgy5EM-Vhw?si=QsL4l5-C3YbPjpXZ" controls className="w-88 aspect-video"></video> */}
      <div className="w-88 aspect-video">
        <ReactPlayer
          src={'https://youtu.be/EKgy5EM-Vhw?si=QsL4l5-C3YbPjpXZ'}
          width="100%"
          height="100%"
          controls={true}
          config={{
            youtube: {
              rel: 0,
              fs: 0
            }
          }}
        />
      </div>
      <p className="text-zinc-500">This page is for testing and development purposes.</p>
      <button onClick={testFullscreen} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Test Button
      </button>
    </div>
  )
}
