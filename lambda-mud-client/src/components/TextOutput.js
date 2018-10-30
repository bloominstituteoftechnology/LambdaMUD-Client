import React from 'react';

const TextOutput = props => {
  return (
    <div className="TextOutput">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
};

TextOutput.defaultProps = {
    title: '',
    description: ''
};

export default TextOutput;