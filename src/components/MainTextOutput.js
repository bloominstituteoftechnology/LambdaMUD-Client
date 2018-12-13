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
const Span3 = styled.span`
  color: goldenrod;
`
const Span4 = styled.span`
  color: maroon;
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
            {text.message && (<Span3><p>{text.message}</p></Span3>)}
            {text.shout && (<Span4><p>{text.shout}</p></Span4>)}
            {text.allPlayerNames && (<Span3><p>All Players Names: {text.allPlayerNames.join(", ")}</p></Span3>)}
          </div>
        ))
      }
    </>
  )
}