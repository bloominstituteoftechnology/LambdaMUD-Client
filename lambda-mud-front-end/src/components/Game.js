import React from 'react';
import Authenticate from './Authenticate';
import '../App.css';

class Game extends React.Component {
  logout = e => {
    e.preventDefault();
    localStorage.setItem("username", "");
    localStorage.setItem("key", "");
    window.location.reload();
  }

  render() {
    return (
      <div>
        <button onClick={this.logout}>Log out</button>
        GAME
      </div>
    );
  }
}

export default Authenticate(Game);
