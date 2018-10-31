import React, { Component } from 'react'

class RoomButtons extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.movePlayer('n')}>Move North</button>
        <button onClick={() => this.props.movePlayer('s')}>Move South</button>
        <button onClick={() => this.props.movePlayer('e')}>Move East</button>
        <button onClick={() => this.props.movePlayer('w')}>Move West</button>
      </div>
    )
  }
}

export default RoomButtons;
