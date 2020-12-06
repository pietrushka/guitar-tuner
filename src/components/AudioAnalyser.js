import {useEffect, useState, useRef} from 'react'
import { getAudio, autoCorrelate } from '../utils'
import StringChooser from './StringChooser'
import Tuner from './Tuner'

export default function AudioAnalyser () {
  const [frequency, setFrequency] = useState()
  const [string, setString] = useState('E4')
  const requestRef = useRef()

  useEffect(() => {

    const analizeAudio = async () => {
      const audio = await getAudio()
  
      const audioCtx = new AudioContext()
      const analyser = audioCtx.createAnalyser()
      const source = audioCtx.createMediaStreamSource(audio)
      source.connect(analyser)
  
      const tick = () => {
        const buflen = 2048
        const buf = new Float32Array( buflen )
        analyser.getFloatTimeDomainData( buf )
        const ac = autoCorrelate(buf, audioCtx.sampleRate)
        let pitch = Math.round(ac)
        if(pitch === -1) pitch = 0
        setFrequency(pitch)
  
        requestRef.current = requestAnimationFrame(tick)
      }
  
      requestRef.current = requestAnimationFrame(tick)
    }

    analizeAudio()
    
    return () => cancelAnimationFrame(requestRef.current)
  }, [])


  return (
    <>
      <Tuner frequency={frequency} string={string} />
      <StringChooser setString={setString} />
    </>
  )
}