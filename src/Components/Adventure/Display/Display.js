import React, { Fragment } from 'react'

const Display = props => {
  return (
    <div className='display'>
      <div className="display-text">
        <p>{`Player: ${props.user.name}`}</p>
        <p>{`Location: ${props.user.title}`}</p>
        <p>{`Description: ${props.user.description}`}</p>
        <div className='players-in-room'>
        {props.user.players ? (
          <Fragment>
            <p>Players in room:</p>
            <ul> 
              {props.user.players.map(player => {
                return <li key={Math.random()}>{player.name}</li>
              })}               
            </ul>
          </Fragment>
        ) : (
          <Fragment>
            <p>No other players in room</p>
          </Fragment>
        )}
        </div>
        <Fragment>
        {props.broadcast.length > 0  ? (
          <div className='messages'>
            {props.broadcast.map(item => {
              return <p key={Math.random()}>{item.message}</p>
            })}
          </div>
        ) : (
          <Fragment />
        )}
        </Fragment>
      </div>
    </div>
  )
}


export default Display