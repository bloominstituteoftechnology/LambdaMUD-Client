import React from 'react';
import Authenticate from './Authenticate';
import '../App.css';

class Game extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.logout}>Log out</button>
        Hi {this.props.username}, this is the game.
      </div>
    );
  }
}

export default Authenticate(Game);
