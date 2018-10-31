import React, { Component } from 'react'


class Room extends Component {

  render() {
    console.log('AT ROOM', this.props)
    return (
      <section className={`${this.props.roomTheme}`}>
        <h2>Room</h2>
        <p>{this.props.roomTitle}</p>
        <h2>Description</h2>
        <p>{this.props.roomDescription}</p>
        {this.props.canWalk ?
          null
          :
          <p>You hit a dead end!</p>
        }
      </section>
    )
  }
}

export default Room;
