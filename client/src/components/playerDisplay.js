import React, { Component } from 'react';
import '../styles/playerDisplay.css';

class PlayerDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="Player-Display">
        {
          this.props.players
            ? this.props.players.map((player) => <div>{player}</div>)
            : ''
        }
      </div>
    );
  }
}

export default PlayerDisplay;
