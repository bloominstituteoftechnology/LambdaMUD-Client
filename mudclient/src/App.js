import React, { Component } from 'react';
import logo from './tiki_logo.png';
import './App.css';
import Register from './components/register';
import Login from './components/login';
import DisplayCurrentRoom from './components/DisplayCurrentRoom';
import DisplayHistory from './components/DisplayHistory';
import Command from './components/Command';
import ChatBox from './components/ChatBox';
import UserInfo from './components/UserInfo';

// {
//   command:'n',
//   description:'testing the waters',
//   title:'this is where you start the game',
//   players: []
// },
// {
//   command:'n',
//   description:'you moved to the next room',
//   title:'uh oh! there is something up ahead',
//   players: []
// },
// {
//   command:'n',
//   description:'you found the treasure!',
//   title:'go enjoy your reward',
//   players: []
// }


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: {
        description:'',
        title:'',
        players: []
      },
      user: {
        uuid:'',
        username:'',
        isRegistered: false,
        isLoggedIn: false,
      },
      progress: [

      ]
    }
    }

  componentDidMount() {
    let token = sessionStorage.getItem('token');
    let username = sessionStorage.getItem('username')
    if(token && username) {
      this.setState({
        user: {'username':username,
        isLoggedIn: true, 
        isRegistered: true, 
      }
      })
    }
  }

  toUpdateUser  = (user) => {
    this.setState({
      user
    })
  }

  toUpdateRoom  = (room) => {
    this.setState({
      room
    })
  }

  toAddProgress = (room_progress) => {
    // progress = JSON.stringify(progress)
    console.log(room_progress)
    this.setState((state) => {
      state.progress.push(room_progress)
    })
    console.log('this.state.progress', this.state.progress)
  }

  render() {

    let registerOrLogin;
    let isLoggedIn = this.state.user.isLoggedIn;
    let isRegistered = this.state.user.isRegistered;
    let currentRoom = this.state.room;
    let currentRoomTitle = this.state.room.title
    let playersInRoom = this.state.room.players;

    if (!isRegistered) {
      registerOrLogin = <Register toUpdateUser = {this.toUpdateUser}/>
    
    }
    else if (!isLoggedIn) {
      registerOrLogin = <Login toAddProgress={this.toAddProgress} toUpdateRoom = {this.toUpdateRoom} toUpdateUser = {this.toUpdateUser}/> 
    }
    else {


    }
    let userinfo;
    let displayCurrentRoom;
    let chatwrapper;
    let commands;
    if (isLoggedIn) {
    userinfo = <UserInfo user={this.state.user}/>
    displayCurrentRoom = <DisplayCurrentRoom currentRoom = {currentRoom} playersInRoom = {playersInRoom} />
    chatwrapper = <div className='display-chat-wrapper'><DisplayHistory progress = {this.state.progress} />
      <ChatBox/></div>
    commands = <Command currentRoom = {currentRoom} toAddProgress={this.toAddProgress}/>
    }
   
    

    return (
      <div className="App">
        {userinfo}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        
       {registerOrLogin}
      {displayCurrentRoom}
      {chatwrapper}
      
      </div>
    )
  }
}

export default App;
