import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        title: '',
        description: '',
        name: '',
        uuid: '',
        players: [],
      },
      messages: [],
      message: '',
      error_msg: ''
    };
  }

  componentDidMount() {
    if (localStorage.getItem('key')) {
      const headersAuthorization = {
        headers: { Authorization: `Token ${localStorage.getItem('key')}`}
      };
      console.log(localStorage.getItem('key'));
      axios
        .get('https://cs13-lambdamudproject.heroku.app.com/api/adv/init', headersAuthorization)
        .then(res => {
          this.setState({ player: res.data });
          console.log(this.state.player);
          const pusher = new Pusher('b40236e5bb40250a12c6', {
            cluster: 'us2'
          });
          const channel = pusher.subscribe(`p-channel-${res.data.uuid}`);
          channel.bind('broadcast', res => {
            const system = Object.values(res).toString();
            let messages = [...this.state.messages];
            messages.push(system);
            this.setState({ messages });
          });
        })
        .catch(err => console.log(err));
    } else {
      this.props.history.push('/api/adv/init');
    }
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/login');
  };

  

  render() {
    return (
      <div className='play-container'>
        <div className='logout'>
          <button onClick={this.handleLogout}>logout</button>
        </div>
        <h1>Welcome to LambdaMUD</h1>
        <div className='play-window'>
          <div className='room'>
            <h2>Current Location</h2>
            <div className='title'>
              <h3>{this.state.player.title}</h3>
            </div>
            <div className='description'>
              <h4>{this.state.player.description}</h4>
            </div>
          </div>
          <div className='players'>
            <h3>Players in the Room:</h3>
            <div className='playerslist'>
              {this.state.player.players.length !== 0 ?
                <h4>{this.state.player.players.map(player => {
                  return (
                    <span>
                      {player}
                      <br />
                    </span>
                  )
                })}
                </h4> : (
                  <h4>No player in the Room</h4>
                )}
            </div>
          </div>
          <div className='command'>
            <div className='message'>
              {this.state.messages.map(message => {
                return (
                  <div key={message}>
                    <p>{message}</p>
                  </div>
                );
              })}
            </div>
            <div className='input'>
              <form onSubmit={this.submitCommand}>
                <input
                  type='text'
                  name='message'
                  placeholder='Enter command'
                  value={this.state.message || ''}
                  onChange={this.handleCommandChange}
                />
                <button>Submit</button>
              </form>
            </div>    
          </div>
        </div>
      </div>
    );
  }
}

export default Play;