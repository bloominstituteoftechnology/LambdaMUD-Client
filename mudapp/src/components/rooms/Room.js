import React, { Component } from 'react'


class Room extends Component {

  // recieves API key, username, room title, room descrption, players, uuid, theme(includes bgimg)

  /*
    apiKey: "d59be0de61b0d6321f17dff7470fe811125415d2"
    movementByOthers: ""
    players: (14) ["alberto", "betotry1", "beto-funk", "check", "NewNewTest", "erferfergergeg", "oioioioioioi", "ukgkuyg", "dergrthsrf", "ehrethrthrth", "ergrtyhtyh", "testtdtj", "NEWTest", "beto_funk"]
    recievedMessage: {sentBy: "", message: ""}
    roomDescription: "North of you, the cave mount beckons"
    roomTheme: "outside-cave-entrance"
    roomTitle: "Outside Cave Entrance"
    userUUID: "a0fcd077-71d4-40e1-8a12-ad3c5e7eff97"
    username: "Macc"
  */

  render() {
    console.log('AT ROOM', this.props.roomInfo)
    return (
      <div className="Themed Room Layer">
        <h2>Room</h2>
        <p>{this.props.roomInfo.roomTitle}</p>
        <h2>Description</h2>
        <p>{this.props.roomInfo.roomDescription}</p>
        {this.props.roomInfo.canWalk ?
          null
          :
          <p>You hit a dead end!</p>
        }
      </div>
    )
  }
}

export default Room;
