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
          <p>You hit a dead end!</p>
        }
      </Section>
    )
  }
}

export default Room;
