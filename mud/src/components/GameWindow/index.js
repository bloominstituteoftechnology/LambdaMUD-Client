import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Pusher from 'pusher-js';
import axios from 'axios';

import "./index.css";

class GameWindow extends Component {
  state = {
    uuid: "",
    name: "",
    room: "",
    desc: "",
    players: [],
    loggedOn: true,
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.setState({ loggedOn: false})
      return
    }
    Pusher.logToConsole = true;
    axios.get("https://lambda-mud-alex.herokuapp.com/api/adv/init", {
      headers: {
        "Authorization": "Token " + token
      }
    })
      .then(response => {
        this.setState({
          uuid: response.data["uuid"],
          name: response.data["name"],
          room: response.data["title"],
          desc: response.data["description"],
          players: response.data["players"],
        })
        const pusher = new Pusher('970731c7cf498dc1ba5f', {
          cluster: 'us2',
          forceTLS: true
        });
        const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
        channel.bind('broadcast', (data) => {
          alert(data.message);
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    return(
      <div className="GameWindow">
        {this.state.loggedOn ? null : <Redirect to="/login" />}
        hello
      </div>
    )
  }
}

export default GameWindow;