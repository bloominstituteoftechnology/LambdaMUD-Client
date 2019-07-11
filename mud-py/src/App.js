import React from 'react';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import ChatBox from './Components/ChatBox';
import Dungeon from './Components/Dungeon';
import RoomInfo from './Components/RoomInfo';
import Commands from './Components/Commands';
import { CssBaseline, Container } from '@material-ui/core';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      currentRoom: {}
    };

    this.content = {
      headers: {
        Authorization: 'Token 626a1a9d5ab38fe08f0bab5d5b75f13fb36a12d0'
      }
    };
  }

  componentDidMount() {
    axios
      .get('https://lambda-mud-test.herokuapp.com/api/adv/init/', this.content)
      .then(data => {
        this.setState({currentRoom: data.data})

      })
      .catch(err => {
        console.log(err);
      });
  }

  tempChangeLogin = () => {
    this.setState(prev => {
      return { loggedIn: !prev.loggedIn };
    });
  };

  render() {
    return (
      <div>
        <CssBaseline />
        <NavBar tempChangeLogin={this.tempChangeLogin} />
        {!this.state.loggedIn ? (
          <Login />
        ) : (
          <Container>
            <Dungeon />
            <ChatBox />
            <Commands />
            <RoomInfo currentRoom={this.state.currentRoom} />
          </Container>
        )}
      </div>
    );
  }
}

export default App;
