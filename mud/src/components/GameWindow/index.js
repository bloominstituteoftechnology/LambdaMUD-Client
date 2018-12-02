import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Pusher from 'pusher-js';
import axios from 'axios';

import RoomInfo from '../RoomInfo';
import ChatBox from '../ChatBox';
import CommandInput from '../CommandInput';

import "./index.css";

class GameWindow extends Component {
  state = {
    uuid: "",
    name: "",
    room: "",
    desc: "",
    players: [],
    messages: [],
    loggedOn: true,
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(token)
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
        this.loadGreetingMessage();
        const pusher = new Pusher('970731c7cf498dc1ba5f', {
          cluster: 'us2',
          forceTLS: true
        });
        const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
        channel.bind('broadcast', response => {
          console.log(response)
          this.streamPusherMessage(response.message);
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  loadGreetingMessage = () => {
    const { room, messages, players } = this.state;
    let newMessages = [
      {
        msg: `You have entered ${room}.`,
        style: {color: "yellow"}
      },
      {
        msg: `Current players in the room: ${players}`,
        style: {color: 'magenta'},
      }
    ]
    newMessages.forEach(item => {
      messages.push(item);
    })
    this.setState({ messages });
  }

  streamPusherMessage = msg => {
    console.log(msg)
    const { messages } = this.state;
    let newMessage = {
      msg,
      style: {color: "navy"}
    }
    let newMessages = [...messages]
    newMessages.push(newMessage);
    this.setState({ messages: newMessages });
  }

  say = msg => {
    const token = localStorage.getItem("token");
    const data = { "message": msg }
    axios.post("https://lambda-mud-alex.herokuapp.com/api/adv/init", {data}, {
      headers: {
        "Authorization": "Token " + token
      }
    })
  }

  render() {
    const { messages, room, desc } = this.state;
    return(
      <div>
        <h1 style={{color: "#ffff66"}}>Lambda MUD Project</h1>
        <div className="GameWindow">
          {this.state.loggedOn ? null : <Redirect to="/login" />}
          <RoomInfo room={room} desc={desc}/>
          <ChatBox messages={messages} />
          <CommandInput />
        </div>
      </div>
    )
  }
}

export default GameWindow;
