import React from 'react'

const MainTextOutput = (props) => {
  return (
    <>
      {
        props.textLog.map((text, index) => (
          <div key={index}>
            <hr />
            <p>{text.title}</p>
            <p>{text.desc}</p>
            {
              text.players.length > 0 && (
                <p>{text.players.length === 1 ? `${text.players} is` : `${text.players.join(", ")} are`} standing here</p>
              )
            }
          </div>
        ))
      }
    </>
  )
}

export default MainTextOutput