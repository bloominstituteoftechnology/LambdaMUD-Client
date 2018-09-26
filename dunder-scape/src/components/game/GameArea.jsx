import React from 'react';


const GameArea = (props) => {
  return (
    <div>
      <textarea value={props.screenInfo} disabled />
      <input
        type="text"
        name="playerInput"
        onChange={props.changeHandler}
        onKeyDown={e => {
          if (e.keyCode === 13 && props.playerInput.match(/\s*\/(\s*)[nswe]*/)) {
            props.moveHandler();
          }
        }}
      />
    </div>
  );
};

export default GameArea;