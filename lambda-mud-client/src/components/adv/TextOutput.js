import React from 'react';

const TextOutput = props => {
  return (
    <div className="TextOutput">
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <p>You see: {props.players}</p>
      <p>New messages: {props.broadcast}</p>
    </div>
  );
};


export default TextOutput;