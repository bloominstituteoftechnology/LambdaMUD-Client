import React, { Component } from 'react'
import axios from 'axios'
import {Route} from 'react-router-dom';

import RoomDescription from '../../components/rooms/RoomDescription';
import RoomButtons from '../../components/rooms/RoomButtons';
import RoomChat from '../../components/rooms/RoomChat';

import { Main } from '../ContainerStyles';


class Rooms extends Component {

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
      console.log('RESSS', res.data.error_msg)
      let roomInfo = {
        roomTitle: res.data.title,
        roomDescription: res.data.description,
        players: res.data.players,
      }
      this.props.updateRoomInfo(roomInfo, res.data.error_msg)
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
    console.log('ROOM STATS', this.props.roomInfo)
    return (
      <Main rooms>
        <RoomChat
          roomTheme={this.props.roomTheme}
          broadcastMessage={this.broadcastMessage}
          chatMessage={this.props.roomInfo.recievedMessage}
          />
        <Route path="/rooms/:id" render={
          props => <RoomDescription {...props}
          roomTheme={this.props.roomTheme}
          roomTitle={this.props.roomInfo.roomTitle}
          roomDescription={this.props.roomInfo.roomDescription}
          canWalk={this.props.roomInfo.canWalk}
          />}/>
        <RoomButtons
          roomTheme={this.props.roomTheme}
          movePlayer={this.movePlayer}
          movementByOthers={this.props.roomInfo.movementByOthers}
          playersInRoom={this.props.roomInfo.players}
        />
      </Main>
    )
  }
}

export default Rooms;
