import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import AudioAnalyser from './components/AudioAnalyser'

function App() {
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    const getAudio = async () => {
      navigator.getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
      const source =  await navigator.mediaDevices.getUserMedia({ video: false, audio: true })

      setAudio(source)
    }

    getAudio()
  }, [])

  return (
      <AppContainer>
        {
          audio ? <AudioAnalyser audio={audio} /> : 'There is no audio'
        }
      </AppContainer>
  )
}
  
export default App

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`