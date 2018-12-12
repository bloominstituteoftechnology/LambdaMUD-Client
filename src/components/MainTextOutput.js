// Renders out textLog and associated values if exists
import React from 'react'
import styled from 'styled-components'

// Styled-Components
const Span1 = styled.span`
  text-decoration: underline;
`
const Span2 = styled.span`
  color: lightseagreen;
`

export default (props) => {
  return (
    <>
      {
        props.textLog.map((text, index) => (
          <div key={index}>
            <hr />
            <Span1>{text.title && (<p>{text.title}</p>)}</Span1>
            {text.desc && (<p>{text.desc}</p>)}
            {text.players && text.players.length > 0 && (
              <Span2><p>{text.players.length === 1 ? `${text.players} is` : `${text.players.join(", ")} are`} standing here</p></Span2>
            )}
            {text.message && (<p>{text.message}</p>)}
          </div>
        ))
      }
    </>
  )
}