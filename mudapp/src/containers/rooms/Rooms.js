import React, { Component } from 'react'
import axios from 'axios'
import {Route} from 'react-router-dom';

import Room from '../../components/rooms/Room';
import RoomButtons from '../../components/rooms/RoomButtons';
import RoomChat from '../../components/rooms/RoomChat';

class Rooms extends Component {

  // recieves API key, username, room title, room descrption, players, uuid

  movePlayer = (direction) => {
    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/adv/move',
      headers: {'Authorization': `Token ${this.props.roomInfo.apiKey}`},
      data: {
        direction
      }
    })
    .then(res => {
      let roomInfo = {
        roomTitle: res.data.title,
        roomDescription: res.data.description,
        players: res.data.players,
      }
      this.props.updateRoomInfo(roomInfo)
    })
    .catch(err => {
      console.log(err)
    });
  }

  broadcastMessage = (message) => {
    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/adv/say',
      headers: {'Authorization': `Token ${this.props.roomInfo.apiKey}`},
      data: {
        message
      }
    })
    .then(res => {
      console.log('Message', res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }


  render() {
    //console.log('ROOM STATS', this.props.roomInfo)
    return (
      <div className="Rooms Layer">
        <RoomChat
          broadcastMessage={this.broadcastMessage}
          chatMessage={this.props.roomInfo.recievedMessage}
          movementByOthers={this.props.roomInfo.movementByOthers}
        />
        <Route path="/rooms/:id" render={props => <Room {...props} roomInfo={this.props.roomInfo} /> } />
        <RoomButtons movePlayer={this.movePlayer} />
      </div>
    )
  }
}

export default Rooms;
