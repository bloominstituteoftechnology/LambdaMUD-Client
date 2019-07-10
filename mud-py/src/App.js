import React from 'react';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import ChatBox from './Components/ChatBox';
import Dungeon from './Components/Dungeon';
import RoomInfo from './Components/RoomInfo';
import Commands from './Components/Commands';

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
        <NavBar tempChangeLogin={this.tempChangeLogin} />
        {!this.state.loggedIn ? <Login /> : (
          <div>
            <Dungeon />
            <ChatBox />
            <Commands />
            <RoomInfo />
          </div>
        )}
      </div>
    );
  }
}

export default App;
