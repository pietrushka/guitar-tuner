import styled from '@emotion/styled'

import {stringFreqs} from '../utils'

export default function StringChooser ({setString}) {
  const stringNames = Object.keys(stringFreqs)

  const handleChange = event => {
    setString(event.target.value)
  } 

  return (
    <ChooserContainer>
      <Form onChange={handleChange} >
        {
          stringNames.map((name) => (
            <StringGroup key={name}>
              <StringInput type='radio' name='string' value={name} id={name} defaultChecked={name === 'E4'} required />
              <StringLabel htmlFor={name}>{name}</StringLabel>
            </StringGroup>
          ))
        }
      </Form >
    </ChooserContainer>
  )
}

const ChooserContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 1rem 0;
`

const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
`

const StringGroup = styled.div``

const StringInput = styled.input`
  display: none;
`

const StringLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  text-align: center;
  border-radius: 50%;
  border: 3px solid black;
  width: 2rem;
  height: 2rem;
`