import React from 'react';

import './index.css';

const Message = props => {
  return(
    <p className="Message" style={props.style}>
      <label className="symbol">$ </label> {props.message}
    </p>
  )
}
export default Message;