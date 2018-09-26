import React, { Component } from 'react';
import '../styles/mainScreen.css';
import axios from 'axios';
import Pusher from 'pusher-js';
import { setPusherClient } from 'react-pusher';

const URL = process.env.REACT_APP_API_URL;

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
      messages: []
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem('key');
    axios
      .get(`${URL}/adv/init/`, {
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then(({data}) => {
        console.log(data);
        const p_uuid = data.uuid;
        const channel = socket.subscribe(`p-channel-${p_uuid}`);
        channel.bind('broadcast', (data) => {
          console.log(data);
          this.setState({messages: data.message});
        });
      })
      .catch((err) => console.log(err.response)); 
  }
  
  render() {
    return (
      <div className="Main-Screen">
        <div>Main Screen</div>
      </div>
    );
  }
}

export default MainScreen;
