import styled from '@emotion/styled'
import AudioAnalyser from './components/AudioAnalyser'

function App() {

  return (
      <AppContainer>
        <AudioAnalyser />
      </AppContainer>
  )
}
  
export default App

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`