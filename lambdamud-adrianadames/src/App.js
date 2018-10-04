import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userRoomSession: [
        {
          currentRoomName: '', 
          currentRoomDescription: '', 
          playersInRoom: [{playerName:''}],
          roomActivity: '',
          userRoomSessionId: ''
        }
      ], 
      commentAndCommandInput: '',
    }
  }

  // addCommentOrCommand = (e) => {
  //   e.preventDefault();
  // }

  render() {
    return (
      <div>
        <header>
            Adventure game!
        </header>
      </div>
    );
  }
}

export default App;
