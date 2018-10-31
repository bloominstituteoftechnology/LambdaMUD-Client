import React, { Component, Fragment } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Pusher from 'pusher-js';

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
    // Store API Key in session storage, authenticate with it, if no API then redirect
    // also implement a log out functionality
    // look into unsubscribing from channels
    // look into seeing who is logged in/logged out
    this.subscribePlayer(roomInfo.userUUID);
    let {apiKey, username, userUUID, roomTitle, roomDescription, players} = roomInfo;
    let regexonEdit = /([a-z0-9\s])/g;
    let roomTheme = roomTitle
    .toLowerCase()
    .match(regexonEdit)
    .join('')
    .split(' ')
    .join('-');
    this.setState({apiKey, username, userUUID, roomTitle, roomDescription, players, roomTheme});
    this.props.history.push(`/rooms/${roomTheme}`);
  }

  subscribePlayer = uuid => {
    let pusher = new Pusher('b2b9253c91c4b0f56a74', {
      cluster: 'us2'
    });
    let channel = pusher.subscribe(`mudappchannel-${uuid}`);
    channel.bind('broadcast', data => {
      const currPlayersArr = this.state.players.slice();
      if (data.exitMovementBroadcast) {
        const broadcastInfo = data.exitMovementBroadcast.split(' ');
        const playerFromBroadcast = broadcastInfo[0];
        const removedPlayerArr = currPlayersArr.filter(player => player !== playerFromBroadcast);
        this.setState({movementByOthers: data.exitMovementBroadcast, players: removedPlayerArr});
      } else if (data.enterMovementBroadcast) {
        const broadcastInfo = data.enterMovementBroadcast.split(' ');
        const playerFromBroadcast = broadcastInfo[0];
        currPlayersArr.push(playerFromBroadcast);
        this.setState({movementByOthers: data.enterMovementBroadcast, players: currPlayersArr});
      } else {
        let messageArr = data.chatMessage.split(',');
        let messageInfo = {
          sentBy: messageArr[0],
          message: messageArr[1]
        }
        this.setState({recievedMessage: messageInfo});
      }
    });
  }

  updateRoomInfo = (roomInfo, canWalk) => {
    if (canWalk === '') {
      let {roomTitle, roomDescription, players} = roomInfo;
        let regexonEdit = /([a-z0-9\s])/g;
        let roomTheme = roomTitle
        .toLowerCase()
        .match(regexonEdit)
        .join('')
        .split(' ')
        .join('-');
        this.setState({roomTitle, roomDescription, players, roomTheme, canWalk: true});
        this.props.history.push(`/rooms/${roomTheme}`);
    } else {
      this.setState({canWalk: false});
    }
  }

  render() {
    return (
        <Fragment>
          <Route exact path="/" render={props => <Home {...props} initRoomInfo={this.initRoomInfo} /> } />
          <Route path="/rooms" render={props => <Rooms {...props} roomInfo={this.state} updateRoomInfo={this.updateRoomInfo} /> } />
        </Fragment>
    );
  }
}

export default withRouter(App);
