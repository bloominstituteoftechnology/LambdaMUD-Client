import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
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
    players: []
  }

  updateRooms = (roomInfo) => {
    let {apiKey, username, userUUID, roomTitle, roomDescription, players} = roomInfo;
    let roomTheme = roomTitle;
    this.setState({apiKey, username, userUUID, roomTitle, roomDescription, players, roomTheme})
    this.props.history.push('/rooms')
  }

  render() {
    return (
        <div className="Main Layer">
          <Route path="/" exact render={props => <Home {...props} updateRooms={this.updateRooms} /> } />
          <Route path="/rooms" exact render={props => <Rooms {...props} roomProps={this.state} /> } />
        </div>
    );
  }
}

export default withRouter(App);
