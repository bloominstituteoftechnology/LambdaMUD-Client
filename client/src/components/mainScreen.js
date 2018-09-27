import React, { Component } from 'react';
import '../styles/mainScreen.css';
import axios from 'axios';
import Pusher from 'pusher-js';
import { setPusherClient } from 'react-pusher';
import UserDisplay from './userDisplay';
import PlayerDisplay from './playerDisplay';
import ChatDisplay from './chatDisplay';

const URL = process.env.REACT_APP_API_URL;
const TOKEN = sessionStorage.getItem('key');
axios.defaults.headers.common['Authorization'] = TOKEN;

Pusher.logToConsole = true;

const socket = new Pusher(`${process.env.REACT_APP_PUSHER_KEY}`, {
  cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`,
  forceTLS: true
});

setPusherClient(socket);

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      messages: [],
      room: {},
    };
  }

  componentDidMount() {
    axios({
      url: `${URL}/adv/init/`,
      headers: {
        'Authorization': `Token ${TOKEN}`,
      }
    })
      .then(({data}) => {
        // console.log(data);
        const p_uuid = data.uuid;
        const channel = socket.subscribe(`p-channel-${p_uuid}`);
        channel.bind('broadcast', (data) => {
          console.log(data);
          let result = data;
          if (data.message) result = data.message; 
          this.setState({messages: [...this.state.messages, result]});
        });
        this.setStateHelper(data);
      })
      .catch((err) => console.log(err.response)); 
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let data = this.state.input.split(' ');
    
    // Handle move request
    if (data.length === 2 && data[0] === '/move') {
      axios({
        method: 'post',
        url: `${URL}/adv/move/`,
        headers: {
          'Authorization': `Token ${TOKEN}`,
        }, 
        data: {'direction': data[1]} 
      }) 
        .then(({data}) => {
          // console.log(data);
          // const p_uuid = data.uuid;
          // const channel = socket.subscribe(`p-channel-${p_uuid}`);
          // channel.bind('broadcast', (data) => {
            // console.log(data);
            // let result = data;
            // if (data.message) result = data.message; 
            // this.setState({messages: [...this.state.messages, result]});
          // });
          this.setStateHelper(data);
        })
        .catch((err) => console.log(err.response));
    }

    // Handle say request
    if (data.length >= 2 && data[0] === '/say') {
      axios({
        method: 'post',
        url: `${URL}/adv/say/`,
        headers: {
          'Authorization': `Token ${TOKEN}`,
        }, 
        data: {'message': data.slice(1, data.length)} 
      }) 
        .then(({data}) => {
          console.log(data);
          const username = Object.keys(data)[0];
          const message = data[username].join(' ');
          const result = `${username} says ${message}`;
          this.setState({messages: [...this.state.messages, result], input: ''});
          console.log(this.state.messages);
        })
        .catch((err) => console.log(err.response));
    }
  };
 
  setStateHelper = (e) => {
    this.setState({
      input: '',
      room: {
        title: e.title,
        description: e.description,
        players: e.players
      }
    });
  };

  render() {
    return (
      <div className="Main-Screen">
        <div className="Block-1">
          <UserDisplay room={this.state.room} />
        </div>
        <div className="Block-2">
          <PlayerDisplay players={this.state.room.players} />
          <ChatDisplay messages={this.state.messages} />
          <div className="User-Input">
            <form onSubmit={this.handleSubmit}>
              <input
                placeholder="Input"
                value={this.state.input}
                name="input"
                onChange={this.handleInput}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MainScreen;
