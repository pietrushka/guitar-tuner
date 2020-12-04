import {useEffect, useState, useRef} from 'react';
import { autoCorrelate } from './utils';

export default function AudioAnalyser ({audio}) {
  const [frequency, setFrequency] = useState()
  const requestRef = useRef();

  useEffect(() => {
    const audioCtx = new AudioContext()
    const analyser = audioCtx.createAnalyser();
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

    return () => cancelAnimationFrame(requestRef.current)
  }, [])


  return (
    <>
      <p>Frequency: {frequency} Hz</p>
    </>
  )
}