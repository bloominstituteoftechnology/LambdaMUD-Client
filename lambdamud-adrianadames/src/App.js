import React, { Component } from 'react';
import './App.css';
import RoomInformation from './Components/RoomInformation';
import RoomActivity from './Components/RoomActivity';
import CommentInput from './Components/CommentInput';
import CreateAccount from './Components/CreateAccount';
import Login from './Components/Login';
import GameDashboard from './Components/GameDashboard';
import Pusher from 'pusher-js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userRoomSessions: [
        {
          currentRoomName: 'foyer', 
          currentRoomDescription: 'Dark and gloomy', 
          playersInRoom: ['playerB', 'playerC', 'playerQ' ],
          roomActivity: ['playerB : hello', 'playerB: anyone here?', 'playerD: I\'m here!'],
          id: 1
        },
        {
          currentRoomName: 'outside', 
          currentRoomDescription: 'Bright and sunny', 
          playersInRoom: ['playerW', 'playerZ', 'playerY' ],
          roomActivity: ['playerW : hello', 'playerW: anyone here?', 'playerD: I\'m here!'],
          id: 2
        }
      ], 
      userRoomSession: {
        currentRoomName: '', 
        currentRoomDescription: '', 
        playersInRoom: [],
        roomActivity: [],
        id: ''
      },
      commentInput: '',
      commandInput: '',
    }
  }

  addNewRoomSession = (e) => {
    e.preventDefault();
    const userRoomSessions = this.state.userRoomSessions.slice();

    const userRoomSession = {
      currentRoomName: this.state.userRoomSession.currentRoomName,
      currentRoomDescription: this.state.userRoomSession.currentRoomDescription,
      playersInRoom: this.state.userRoomSession.playersInRoom,
      roomActivity: this.state.userRoomSession.roomActivity,
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

  addComment = (e) => {
    // e.preventDefault();
    const userRoomSessions = this.state.userRoomSessions.slice();
    const userRoomSession = {
      currentRoomName: this.state.userRoomSession.currentRoomName,
      currentRoomDescription: this.state.userRoomSession.currentRoomDescription,
      playersInRoom: this.state.userRoomSession.playersInRoom,
      roomActivity: this.state.userRoomSession.roomActivity,
      id: this.state.userRoomSession.id
    };
    const comment = this.state.comment;
    const id = this.state.userRoomSession.id;
    const roomActivity = this.state.userRoomSession.roomActivity;

    for (let i = 0; i < userRoomSessions.length; i++) {
      if (userRoomSessions[i].id === userRoomSession.id) {
        userRoomSession[roomActivity] = userRoomSession[roomActivity].push(comment);
        userRoomSessions[i] = userRoomSession;
        this.setState(()=> ({userRoomSessions: userRoomSessions}));
      }
    }
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
        <div>
          <header>
              Adventure game!
          </header>
        </div>

        <div>
          <CreateAccount/>
        </div>

        <div>
          <Login/>
        </div>

        <div>
          <GameDashboard />
        </div>

        <div>
          <RoomInformation 
            currentRoomName = {this.state.userRoomSession.currentRoomName}
            currentRoomDescription = {this.state.userRoomSession.currentRoomDescription}
            playersInRoom = {this.state.userRoomSession.playersInRoom}
          />
        </div>

        <div>
          <RoomActivity 
            roomActivity = {this.state.userRoomSession.roomActivity}
          />
        </div>

        <div>
          <CommentInput 
            addComment = {this.addComment}
            addCommentHandler = {this.addCommentHandler}
            commentInput = {this.state.commentInput}
          />
        </div>
        

      </div>

    );
  }
}

export default App;
