import React, { Component } from 'react';
import '../styles/mainScreen.css';
import axios from 'axios';
import Pusher from 'pusher-js';
import { setPusherClient } from 'react-pusher';
import UserDisplay from './userDisplay';

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
      room: {}
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
          this.setState({messages: [...this.state.messages, data]});
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
        <UserDisplay room={this.state.room}/>
        <div className="Map-Screen">
          Display Map Here
        </div>
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
        <div className="Chat-Screen">
          Display Chat Here
        </div>
      </div>
    );
  }
}

export default MainScreen;
