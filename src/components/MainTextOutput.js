// Renders out textLog and associated values if exists
import React from 'react'

export default (props) => {
  return (
    <>
      {
        props.textLog.map((text, index) => (
          <div key={index}>
            <hr />
            {text.title && (<p>{text.title}</p>)}
            {text.desc && (<p>{text.desc}</p>)}
            {text.players && text.players.length > 0 && (
              <p>{text.players.length === 1 ? `${text.players} is` : `${text.players.join(", ")} are`} standing here</p>
            )}
            {text.message && (<p>{text.message}</p>)}
          </div>
        ))
      }
    </>
  )
}