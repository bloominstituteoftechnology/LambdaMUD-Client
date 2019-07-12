import React from 'react';
import { Box } from '@material-ui/core';

function RoomInfo(props) {
  return (
    <div
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      style={{
        backgroundColor: 'black',
        color: 'white',
        width: '30%',
        height: '30vh',
        paddingLeft: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}
    >
      <div>{props.currentRoom.title} </div>
      <div>{props.currentRoom.description}</div>
      <div
        style={{
          backgroundColor: 'black',
          color: 'white',
          paddingLeft: '15px',
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        {props.currentRoom.players ? (
          <div>
            Players who are in the room with you:{' '}
            {props.currentRoom.players.map((player, index) => {
              return <div key={index}>{player}</div>;
            })}
          </div>
        ) : (
          <div>There are no players in sight</div>
        )}
      </div>
    </div>
  );
}

export default RoomInfo;
