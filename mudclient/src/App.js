import React, { Component } from 'react';
import logo from './tiki_logo.png';
import './App.css';
import Register from './components/register';
import Login from './components/login';
import DisplayCurrentRoom from './components/DisplayCurrentRoom';
import DisplayHistory from './components/DisplayHistory';
import Command from './components/Command';
import ChatBox from './components/ChatBox';



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
      progress: [{
          command:'n',
          description:'testing the waters',
          title:'this is where you start the game',
          players: []
        }
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

  toAddProgress = (progress) => {
    // progress = JSON.stringify(progress)
    console.log(progress)
    // this.setState((state) => {
    //   state.progress.push()
    // })
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

    console.log('current room: ', currentRoom)
    let displayCurrentRoom;
    
    if(currentRoomTitle != '') {
      displayCurrentRoom = <DisplayCurrentRoom currentRoom = {currentRoom} playersInRoom = {playersInRoom} />
    }


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
       {registerOrLogin}
      {displayCurrentRoom}
      <div className='display-chat-wrapper'><DisplayHistory progress = {this.state.progress} />
      <ChatBox/></div>
      <Command />
      </div>
    )
  }
}

export default App;
