import React from 'react';
import "./index.css";

const Button = props => {
  return(
    <div className="Button">
      {props.text}
    </div>
    );
}

export default Button;
