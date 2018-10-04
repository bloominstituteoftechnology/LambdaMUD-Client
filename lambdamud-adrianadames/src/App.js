import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userRoomSessions: [
        {
          currentRoomName: '', 
          currentRoomDescription: '', 
          playersInRoom: [],
          roomActivity: [],
          id: ''
        }
      ], 
      commandInput: '',
      commentInput: ''
    }
  }

  addNewRoomSession = (e) => {
    e.preventDefault();
    const userRoomSessions = this.state.userRoomSessions.slice();

    const userRoomSession = {
      currentRoomName: this.state.userRoomSessions.currentRoomName,
      currentRoomDescription: this.state.userRoomSessions.currentRoomDescription,
      playersInRoom: this.state.userRoomSessions.playersInRoom,
      roomActivity: this.state.userRoomSessions.roomActivity,
      id: this.state.userRoomSessions.length+1
    }

    const userRoomSessionBlank = {
      currentRoomName: '', 
      currentRoomDescription: '',
      playersInRoom: [],
      roomActivity: [], 
      id: ''
    }

    userRoomSessions.push(userRoomSession);
    this.setState({userRoomSessions: userRoomSessions, userRoomSession: userRoomSessionBlank})
  }

  addComment = e => {
    e.preventDefault();
    const userRoomSessions = this.state.userRoomSessions.slice();
    const userRoomSession = {
      currentRoomName: this.state.userRoomSessions.currentRoomName,
      currentRoomDescription: this.state.userRoomSessions.currentRoomDescription,
      playersInRoom: this.state.userRoomSessions.playersInRoom,
      roomActivity: this.state.userRoomSessions.roomActivity,
      id: this.state.userRoomSessions.id
    };
    const comment = this.state.comment;


    for (let i = 0; i < userRoomSessions.length; i++) {
      if (userRoomSessions[i].userRoomSession[id] === userRoomSession[id]) {
        userRoomSession[roomActivity] = userRoomSession[roomActivity].push(comment);
        userRoomSessions[i] = userRoomSession;
      }
      else {
        return 'Error'
      }
    }
    this.setState(()=> ({userRoomSessions: userRoomSessions}));
  }

  addCommentHandler = e => {
    console.log(e.target.value);

    this.setState({
      commentInput: [e.target.value]
    })
  }

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
