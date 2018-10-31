import React, { Component } from 'react'
import { Section } from './RoomStyles';


class Room extends Component {

  render() {
    console.log('AT ROOM', this.props)
    return (
      <Section description className={`${this.props.roomTheme}`}>
        <h2>Description</h2>
        <p>{this.props.roomDescription}</p>
        {this.props.canWalk ?
          null
          :
          <strong>You hit a dead end!</strong>
        }
      </Section>
    )
  }
}

export default Room;
