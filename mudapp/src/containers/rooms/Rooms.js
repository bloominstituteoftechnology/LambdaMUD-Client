import React, { Component } from 'react'

import Room from '../../components/rooms/Room';

class Rooms extends Component {

  // recieves API key, username, room title, room descrption, players, uuid


  render() {
    console.log(this.props.roomProps)
    return (
      <div className="Rooms Layer">
        <Room />
      </div>
    )
  }
}

export default Rooms;