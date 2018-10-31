import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Pusher from 'pusher-js';
import './App.css';

import Home from './containers/user/Home';
import Rooms from './containers/rooms/Rooms';


class App extends Component {

  state = {
    apiKey: '',
    username: '',
    userUUID: '',
    roomTitle: '',
    roomDescription: '',
    roomTheme: '',
    canWalk: true,
    movementByOthers: '',
    recievedMessage: {
      sentBy: '',
      message: ''
    },
    players: []
  }

  initRoomInfo = (roomInfo) => {
    console.log('INIT', roomInfo)
    let pusher = new Pusher('b2b9253c91c4b0f56a74', {
      cluster: 'us2'
    });
    let channel = pusher.subscribe(`mudappchannel-${roomInfo.userUUID}`);
    channel.bind('pusher:subscription_succeeded', function(members) {
      console.log('successfully subscribed!');
    });
    channel.bind('broadcast', data => {
      // Broadcast message to players

      
      if (data.exitMovementBroadcast) {
        const players = this.state.players.slice();
        
        this.setState({movementByOthers: data.movementBroadcast})

      } else if (data.enterMovementBroadcast) {

        this.setState({movementByOthers: data.movementBroadcast})

      } else {

        console.log(data.chatMessage)
        let messageArr = data.chatMessage.split(',')
        let messageInfo = {
          sentBy: messageArr[0],
          message: messageArr[1]
        }
        this.setState({recievedMessage: messageInfo})

      }
    });

    let {apiKey, username, userUUID, roomTitle, roomDescription, players} = roomInfo;
    let regexonEdit = /([a-z0-9\s])/g;
    let roomTheme = roomTitle
    .toLowerCase()
    .match(regexonEdit)
    .join('')
    .split(' ')
    .join('-');
    this.setState({apiKey, username, userUUID, roomTitle, roomDescription, players, roomTheme})
    this.props.history.push(`/rooms/${roomTheme}`)
  }
  
  updateRoomInfo = (roomInfo, canWalk) => {
    console.log('UPDATE', roomInfo, canWalk)
    if (canWalk === '') {
      let {roomTitle, roomDescription, players} = roomInfo;
        let regexonEdit = /([a-z0-9\s])/g;
        let roomTheme = roomTitle
        .toLowerCase()
        .match(regexonEdit)
        .join('')
        .split(' ')
                .join('-');
        this.setState({roomTitle, roomDescription, players, roomTheme, canWalk: true})
        this.props.history.push(`/rooms/${roomTheme}`)
    } else {
      this.setState({canWalk: false})
    }
  }

  render() {
    return (
        <div className="Main Layer">
          <Route exact path="/" render={props => <Home {...props} initRoomInfo={this.initRoomInfo} /> } />
          <Route path="/rooms" render={props => <Rooms {...props} roomInfo={this.state} updateRoomInfo={this.updateRoomInfo} /> } />
        </div>
    );
  }
}

export default withRouter(App);
