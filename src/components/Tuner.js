import { useState, useEffect } from 'react'
import {css} from '@emotion/react'
import styled from '@emotion/styled'

import {stringFreqs, freqAccuracy} from '../utils'

export default function Tuner ({frequency, string}) {
  const [swing, setSwing] = useState(null)

  useEffect(() => {
    const calcSwing = () => {
      const correctFreq = stringFreqs[string]
      const freqDifference = Math.abs(frequency - correctFreq)

      let newSwing

      if (freqDifference > freqAccuracy.terrible || frequency === 0) {
        newSwing = null
      } else {
        newSwing = freqDifference 
      }
      return newSwing
    }

    const newSwing = calcSwing()
    setSwing(newSwing)
  }, [frequency, string])

  return (
    <TunerCoontainer>
      <Circle swing={swing}>
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
`

const Circle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  border: 3px solid black;


  ${({swing}) => swing && css`
    &::before {
      position: absolute;
      display: block;
      left: ${swing}px;
      content: '';
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      background: red;
    }
  `}
`

const StringID = styled.span`
  z-index: 10;
`