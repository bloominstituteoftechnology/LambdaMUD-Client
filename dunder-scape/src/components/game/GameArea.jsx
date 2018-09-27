import React from 'react';
import styled from 'styled-components';


const Screen = styled.div`
  height: 300px;
  width: 100%;
  overflow-y: scroll;
  background: darkblue;
`;
const PlayerInput = styled.input`
  height: 50px;
`;
const GameArea = (props) => {
  return (
    <div>
      <Screen>{props.history.map((line, i) => {
          return <p key ={line + i}>{line}</p>
        })}</Screen>
      <PlayerInput
        type="text"
        name="playerInput"
        onChange={props.changeHandler}
        onKeyDown={e => {
          if (e.keyCode === 13 && props.playerInput.match(/\s*\/(\s*)[nswe]*/)) {
            props.moveHandler();
          }
          else if (e.keyCode === 13) {
            props.sayHandler();
          }
        }}
      />
    </div>
  );
};

export default GameArea;