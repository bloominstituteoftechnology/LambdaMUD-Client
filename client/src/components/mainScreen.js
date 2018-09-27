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
        "Authorization": `Token ${TOKEN}`,
      }
    })
      .then(({data}) => {
        // console.log(data);
        const p_uuid = data.uuid;
        const channel = socket.subscribe(`p-channel-${p_uuid}`);
        channel.bind('broadcast', (data) => {
          // console.log(data);
          this.setState({messages: [...data.message, data]});
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
    );
  }
}

export default MainScreen;
