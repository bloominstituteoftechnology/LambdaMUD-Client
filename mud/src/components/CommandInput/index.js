import React, { Component } from 'react';

import Button from '../Button';

import './index.css';

class CommandInput extends Component {
  render() {
    return(
      <div className="Command">
        <input
          className="CommandInput"
        />
        <Button text="Send" />
      </div>
    )
  }
}

export default CommandInput;