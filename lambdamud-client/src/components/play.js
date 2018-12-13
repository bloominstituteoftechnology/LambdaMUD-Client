import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      name: '',
      uuid: '',
      players: [],
      chat: [],
      message: ''
    };
  }

  render() {
    return (
      <div>
        <div className='play-view'>
          <h1>Welcome {this.state.name}</h1>
          <p>
            You're location: {this.state.title}
            <br/>
            {this.state.description}
            <br/>
            {this.state.players.length > 0
              ? 'Other players are here'
              : 'No one else is here'}
          </p>
          <div>
            <h3>Which direction do you want to go next?</h3>
            <button name='n'>North</button>
            <button name='s'>South</button>
            <button name='e'>East</button>
            <button name='w'>West</button>
          </div>
        </div>
        <div className='chat-box'>
          <div className='chat'>
              
          </div>
        </div>
      </div>
    );
  }
}

export default Play;