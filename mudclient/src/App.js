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


console.log(process.env);


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
      roomprogress: [],
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

  toAddProgress = (new_progress) => {
    // progress = JSON.stringify(progress)
    console.log(new_progress)
    let newArray = this.state.roomprogress.slice();
    newArray.push(new_progress)
    this.setState({
    roomprogress: newArray
    })
    console.log('this.state.progress', this.state.roomprogress)
  }

  render() {

    let registerOrLogin;
    let isLoggedIn = this.state.user.isLoggedIn;
    let isRegistered = this.state.user.isRegistered;
    let currentRoom = this.state.room;
    let currentRoomTitle = this.state.room.title
    let playersInRoom = this.state.room.players;

    if (!isRegistered) {
      registerOrLogin = <Register toUpdateRoom={this.toUpdateRoom} toUpdateUser = {this.toUpdateUser}/>
    
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
    
    
    }
   
    

    return (
      <div className="App">
        {userinfo}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        
       {registerOrLogin}
      {displayCurrentRoom}
      <div className='display-chat-wrapper'><DisplayHistory user={this.state.user} progress={this.state.roomprogress} />
      <ChatBox user={this.state.user}/></div>
      <Command toUpdateRoom={this.toUpdateRoom} currentRoom = {currentRoom} toAddProgress={this.toAddProgress}/>
      </div>
    )
  }
}

export default App;
