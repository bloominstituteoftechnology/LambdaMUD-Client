import React, { Component } from 'react';
import '../styles/userDisplay.css';

class UserDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="User-Display">
        <div>{this.props.room.title}</div>
        <div>{this.props.room.description}</div>
        <div>Players:
          {
            this.props.room.players !== undefined
              ? this.props.room.players.map((p) => <span> {p} </span>)
              : ''
          }
        </div>
      </div>
    );
  }
}

export default UserDisplay;
