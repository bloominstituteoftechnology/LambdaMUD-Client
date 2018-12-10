import React from 'react'
import styled from 'styled-components'

const Main = (props) => {
  return (
    <Div1>
      <h1>Main Component</h1>
      <button onClick={e => props.logout(e)}> Logout</button>
    </Div1>
  )
}
const Div1 = styled.div`
  text-align: center;
`

export default Main