import React, { Component } from "react";
import axios from 'axios';
import './rooms.css'
import Pusher from 'pusher-js'

class Room extends Component {
  constructor() {
    super();
    this.state = {
      room: null,
      key: localStorage.getItem('key'),
      msg: "",
      err: "",
      uuid: null,
      chat: []
    };
  }

  componentDidMount() {
    if (localStorage.getItem("key")) {
      this.init()
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  init = () => {
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    axios.get("http://localhost:8000/api/adv/init/", { headers: header }) 
    .then(response => {
      this.setState({room: response.data});
      this.setState({uuid: response.data.uuid});
      this.pusher();
    })
    .catch(error => {
      console.log(error.response);
    })
  }

  pusher = () => {
    const pusher = new Pusher("d0fbd4482a84b15b839e", {
        cluster: "us2"
      });
    const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
    channel.bind('broadcast', function(data) {
        alert(data.message)})
    Pusher.logToConsole = true
  }

  move = (direction) => {
    const header = {
        "Authorization": `Token ${this.state.key}`,
        "Content-Type": "application/json"
      };
      axios.post("http://localhost:8000/api/adv/move/", {direction: direction}, { headers: header})
      .then(response => {
        this.setState({room: response.data});
        // this.pusher()
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  say = (msg) => {
    const header = {
        "Authorization": `Token ${this.state.key}`,
        "Content-Type": "application/json"
      };
      axios.post("http://localhost:8000/api/adv/say/", {message: msg}, { headers: header})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        alert("No one is around to hear...");
      })
  }

  render() {
    return (
    <div>
       {this.state.room ? <div>
       <p className="player">In this room: {this.state.room.name}{this.state.room.players.map(p => `, ${p}`)}</p>
       <p>{this.state.room.title}</p>
       <p>{this.state.room.description}</p>
       <div className="chat">
            <div>{this.state.chat.map(msg => <p>{msg}</p>)}</div>
            <span>{this.state.room.name}:</span> <input onChange={this.handleInput}id="msg" placeholder="message"/><button type="submit" onClick={()=>this.say(this.state.msg)}>enter</button>
        </div>
       </div>: <p>heck, something went wrong, try refreshing the page</p>}
       <div className="directions">
        <div className="dir-btn" onClick={() => this.move("n")}>North</div>
        <div className="dir-btn" onClick={() => this.move("e")}>East</div>
        <div className="dir-btn" onClick={() => this.move("s")}>South</div>
        <div className="dir-btn" onClick={() => this.move("w")}>West</div>
       </div>
    </div>
    )
  }
}

export default Room;
