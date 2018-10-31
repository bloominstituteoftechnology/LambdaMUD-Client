import React, { Component } from 'react'

class RoomButtons extends Component {
  render() {
    return (
      <section  className="Themed Buttons Layer">
        <button onClick={() => this.props.movePlayer('n')}>Move North</button>
        <button onClick={() => this.props.movePlayer('s')}>Move South</button>
        <button onClick={() => this.props.movePlayer('e')}>Move East</button>
        <button onClick={() => this.props.movePlayer('w')}>Move West</button>
      </section>
    )
  }
}

export default RoomButtons;
