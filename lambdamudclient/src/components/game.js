import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

class Game extends Component {
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

  componentDidMount() {
    Pusher.logToConsole = true;
    const token = 'Token ' + localStorage.getItem('jwt');
    console.log(token);
    const reqOptions = {
      headers: {
        Authorization: token 
      }
    };

    axios 
      .get('https://lmabdamudmok.herokuapp.com/api/adv/init/', reqOptions, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials:false
      })
      .then(res => {
        console.log(res.data);
        const pusher = new Pusher('1d864511b538b298cf80', {
          cluster: 'us2'
        });

        this.channel = pusher.subscribe(
          `p-channel-${res.data.uuid}`,
          res.data.uuid
        );

        this.channel.bind('broadcast', response => {
          console.log('Broadcast: ' + JSON.stringify(response));
          let chat = this.state.chat.slice();
          chat.push(response);
          this.setState({ chat: chat });
        });

        this.setState({
          title: res.data.title,
          description: res.data.description,
          name: res.data.name,
          uuid: res.data.uuid,
          players: res.data.players
        });
      })
      .catch(err => {
        console.log('Axios Error INIT: ', err.response);
      });
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/login');
  };

  handleMove = event => {
    // event.preventDefault();
    const { name } = event.target;
    const token = 'Token' + localStorage.getItem('jwt');
    console.log(name);
    const reqOptions = {
      headers: {
        Authorization: token 
      }
    };

    const data = {
      direction: name 
    };
    axios
      .post('https://lmabdamudmok.herokuapp.com/api/adv/move/',
        data,
        reqOptions, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials:false
        }
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          title: res.data.title,
          description: res.data.description,
          name: res.data.name,
          uuid: res.data.uuid,
          players: res.data.players,
          chat: []
        });
      })
      .catch(err => {
        console.error('Axios Error MOVE: ', err.response);
      });
  };

  speak = event => {
    event.preventDefault();
    const token = 'Token' + localStorage.getItem('jwt');
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };

    const data = {
      message: this.state.message
    };
    console.log(this.state.message);
    axios
      .post('https://lmabdamudmok.herokuapp.com/api/adv/say',
        data,
        reqOptions, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials:false
        }
      )
      .then(response => {
        const chat = this.state.chat.slice();
        chat.push({
          username: response.data.username,
          message: response.data.message
        });
        this.setState({
          chat: chat 
        });
      })
      .catch(err => {
        console.log('Axios Error SAY: ', err.response);
      });
  };

  render() {
    return (
      <div>
        <div>
          <p>
            You're location: {this.state.title}
            {this.state.description} 
            {this.state.players.length > 0
              ? 'Other players are here'
              : 'No one else is here'}
          </p>
          <div>
            <h2>Which way would you like to go?</h2>
            <button name='n' onClick={this.handleMove}>
              North
            </button>
            <button name='s' onClick={this.handleMove}>
              South
            </button>
            <button name='e' onClick={this.handleMove}>
              East
            </button>
            <button name='w' onClick={this.handleMove}>
              West
            </button>
          </div>
        </div>
        <div>
          <div>
            {this.state.chat.map((data, index) => (
              <p key={index}>
                {data.username ? data.username : ''}{' '}
                {data.username ? ' says ' : ''} {data.message}
              </p>
            ))}
          </div>
          <form onSubmit={this.speak}>
            <div>
              <label>Would you like to say something?</label>
              <input
                name='message'
                value={this.state.message}
                onChange={this.handleChange}
                type='text'
              />
            </div>
            <div>
              <button type='submit'>Speak</button>
            </div>
          </form>
        </div>
        <div>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
      </div>
    );
  }
}
export default Game;

