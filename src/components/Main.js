import React from 'react'
import styled from 'styled-components'

const Main = (props) => {
  return (
    <Div1>
      <Div2>
        <p>Adventure</p>
        <Div3>
          <p>Text Output</p>
        </Div3>
        <Div4>
          <p>User input</p>
          <button onClick={e => props.logout(e)}>Send</button>
        </Div4>
      </Div2>
      <button onClick={e => props.logout(e)}>Logout</button>
    </Div1>
  )
}
const Div1 = styled.div`
  width: 100%;
  text-align: center;
`
const Div2 = styled.div`
  width: 90%;
  margin: 0 auto;
  border: 1px solid white;
  `
const Div3 = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px solid white;
  `
const Div4 = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px solid white;
  display: flex;
  justify-content: space-between;
`

export default Main