import { useState, useEffect } from 'react'
import {css} from '@emotion/react'
import styled from '@emotion/styled'

import {stringFreqs, freqAccuracy} from '../utils'

export default function Tuner ({frequency, string}) {
  const [swing, setSwing] = useState(null)
  const [accuracyColor, setAccuracyColor] = useState(null)

  useEffect(() => {
    const calcSwing = () => {
      const correctFreq = stringFreqs[string]
      const freqDifference = frequency - correctFreq
      const absoluteDiff = Math.abs(freqDifference)

      let newSwing = freqDifference * 2.5  

      if (absoluteDiff > freqAccuracy.terrible || frequency === 0) {
        return newSwing = null
      } else if (absoluteDiff > freqAccuracy.bad) {
        setAccuracyColor('red')
      } else if (absoluteDiff > freqAccuracy.good) {
        setAccuracyColor('yellow')
      } else {
        setAccuracyColor('green')
      }
      
      return newSwing
    }

    const newSwing = calcSwing()
    setSwing(newSwing)
  }, [frequency, string])

  return (
    <TunerCoontainer>
      <Circle swing={swing} accuracyColor={accuracyColor}>
        <StringID>{string}</StringID>
      </Circle>
    </TunerCoontainer>
  )
}

const TunerCoontainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  overflow: hidden;
`

const Circle = styled.div`
  font-size: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  border: 3px solid black;


  ${({swing, accuracyColor}) => swing && css`
    &::before {
      position: absolute;
      display: block;
      left: ${swing}px;
      content: '';
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      background: ${accuracyColor};
    }
  `}
`

const StringID = styled.span`
  z-index: 10;
`