import React from 'react';
import "./index.css";

const Button = props => {
  return(
    <div className="Button" onClick={props.event}>
      {props.text}
    </div>
    );
}

export default Button;
