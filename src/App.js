import React, {useEffect, useState} from 'react';

import AudioAnalyser from './AudioAnalyser';

function App() {
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    const getAudio = async () => {
      navigator.getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia;
      const source =  await navigator.mediaDevices.getUserMedia({ video: false, audio: true })

      setAudio(source)
    }

    getAudio()
  }, [])

  return (
    <>
      {
        audio ? <AudioAnalyser audio={audio} /> : 'There is no audio'
      }
    </>
  )
}
  
export default App;