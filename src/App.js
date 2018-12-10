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

  componentDidMount() {
    if (sessionStorage.getItem('refresh')) {
      let data = JSON.parse(sessionStorage.getItem('refresh'));
      if (data.apiKey === '') {
        this.props.history.push('/');
      } else {
        const {apiKey, username, userUUID, roomTitle, roomDescription, players, roomTheme} = data;
        this.setState({apiKey, username, userUUID, roomTitle, roomDescription, players, roomTheme});
      }
    } else {
      this.props.history.push('/');
    }
  }

  initRoomInfo = (roomInfo) => {
    this.subscribePlayer(roomInfo.userUUID);
    let {apiKey, username, userUUID, roomTitle, roomDescription, players} = roomInfo;
    let regexonEdit = /([a-z0-9\s])/g;
    let roomTheme = roomTitle
    .toLowerCase()
    .match(regexonEdit)
    .join('')
    .split(' ')
    .join('-');
    let sessionSave = {apiKey, username, userUUID, roomTitle, roomDescription, players, roomTheme}
    sessionStorage.setItem('refresh', JSON.stringify(sessionSave));
    this.setState({apiKey, username, userUUID, roomTitle, roomDescription, players, roomTheme});
    this.props.history.push('/rooms');
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
        const {apiKey, username, userUUID} = this.state;
        let sessionSave = {apiKey, username, userUUID, roomTitle, roomDescription, players, roomTheme}
        sessionStorage.setItem('refresh', JSON.stringify(sessionSave));
        this.setState({roomTitle, roomDescription, players, roomTheme, canWalk: true});
    } else {
      this.setState({canWalk: false});
    }
  }

  render() {
    return (
        <Fragment>
          <Route exact path="/" render={
            props => <Home {...props} initRoomInfo={this.initRoomInfo} /> } />
          <Route path="/rooms" render={
            props => <Rooms {...props}
            roomInfo={this.state}
            updateRoomInfo={this.updateRoomInfo}
          /> } />
        </Fragment>
    );
  }
}

export default withRouter(App);
