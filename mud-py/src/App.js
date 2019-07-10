import React from 'react';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import ChatBox from './Components/ChatBox';
import Dungeon from './Components/Dungeon';
import RoomInfo from './Components/RoomInfo';
import Commands from './Components/Commands';
import { CssBaseline, Container } from '@material-ui/core';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false
    };
  }

  tempChangeLogin = () => {
    this.setState(prev => {
      return {loggedIn: !prev.loggedIn}
    })
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <NavBar tempChangeLogin={this.tempChangeLogin} />
        {!this.state.loggedIn ? <Login /> : (
          <Container>
            <Dungeon />
            <ChatBox />
            <Commands />
            <RoomInfo />
          </Container>
        )}
      </div>
    );
  }
}

export default App;
