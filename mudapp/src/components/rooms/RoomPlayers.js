import React from 'react';

import { PlayerSection, PlayerMovement, PlayersInRoom } from './RoomStyles';


function RoomPlayers(props) {
  return (
    <PlayerSection>
      <h1>Players</h1>
      <PlayerMovement>
        <h3>Player Movements</h3>
        {props.movementByOthers === '' ?
            <p>No Activity..</p>
            :
            <p>{`${props.movementByOthers}`}</p>
          }
      </PlayerMovement>
      <h3>Players In Room</h3>
      <PlayersInRoom>
        {props.playersInRoom.length === 0 ?
          <p>No Players in here..</p>
          :
          props.playersInRoom.map(player => {
            return <p key={player}>{player}</p>
          })
        }

      </PlayersInRoom>
    </PlayerSection>
  )
}

export default RoomPlayers;
