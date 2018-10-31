import React from 'react';

const TextOutput = props => {
  return (
    <div className="TextOutput">
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <p>You see: {props.players}</p>
    </div>
  );
};

// TextOutput.defaultProps = {
//     title: '',
//     description: '',
//     players: ''
// };

export default TextOutput;