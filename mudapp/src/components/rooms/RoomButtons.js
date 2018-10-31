import React, { Component } from 'react'
import { Section } from './RoomStyles';


class RoomButtons extends Component {
  render() {
    return (
      <Section buttons className={`${this.props.roomTheme}`}>
        <div>
          <button onClick={() => this.props.movePlayer('n')}>North</button>
        </div>
        <div>
          <button onClick={() => this.props.movePlayer('w')}>West</button>
          <button onClick={() => this.props.movePlayer('e')}>East</button>
        </div>
        <div>
          <button onClick={() => this.props.movePlayer('s')}>South</button>
        </div>
      </Section>
    )
  }
}

export default RoomButtons;
