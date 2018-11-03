import React, { Component } from 'react';
import axios from 'axios';

import RoomDescription from '../../components/rooms/RoomDescription';
import RoomButtons from '../../components/rooms/RoomButtons';
import RoomChat from '../../components/rooms/RoomChat';

import { Main } from '../ContainerStyles';
import '../../index.css';


class Rooms extends Component {
  state = {
    moveFetching: false, // loading
    movefetchSuccess: null, // new state
    movefetchFailure: null, // error mssg
  }

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
      this.props.updateRoomInfo(roomInfo, res.data.error_msg);
    })
    .catch(err => {
      console.log(err);
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
      console.log('Message', res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <Main rooms className={`${this.props.roomInfo.roomTheme}`}>
        <RoomChat
          roomTheme={this.props.roomInfo.roomTheme}
          broadcastMessage={this.broadcastMessage}
          chatMessage={this.props.roomInfo.recievedMessage}
          />
        <RoomDescription
          roomTheme={this.props.roomInfo.roomTheme}
          roomTitle={this.props.roomInfo.roomTitle}
          roomDescription={this.props.roomInfo.roomDescription}
          canWalk={this.props.roomInfo.canWalk}
        />
        <RoomButtons
          roomTheme={this.props.roomInfo.roomTheme}
          movePlayer={this.movePlayer}
          movementByOthers={this.props.roomInfo.movementByOthers}
          playersInRoom={this.props.roomInfo.players}
        />
      </Main>
    )
  }
}

export default Rooms;
