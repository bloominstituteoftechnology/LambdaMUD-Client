import React, { Component } from "react";
import axios from "axios";
import "./game.css";
import Pusher from "pusher-js";
import {Link } from "react-router-dom";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      room: null,
      key: localStorage.getItem("key"),
      msg: "",
      err: "",
      uuid: null,
      chat: []
    };
  }

  componentDidMount() {
    if (localStorage.getItem("key")) {
      this.init();
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
    axios
      .get("https://mudlambdahuthman.herokuapp.com/api/adv/init/", { headers: header })
      .then(response => {
        this.setState({ room: response.data });
        this.setState({ uuid: response.data.uuid });
        this.pusher();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  pusher = () => {
    const pusher = new Pusher("1b4118407e6882f44d92", {
      cluster: "us2"
    });
    const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
    channel.bind("broadcast", function(data) {
      alert(data.message);
      
    });
    Pusher.logToConsole = true;
  };

  move = direction => {
    const header = {
      Authorization: `Token ${this.state.key}`,
      "Content-Type": "application/json"
    };
    axios
      .post(
        "https://mudlambdahuthman.herokuapp.com/api/adv/move/",
        { direction: direction },
        { headers: header }
      )
      .then(response => {
        this.setState({ room: response.data });
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  };
   render() {
    return (
      <div>
        {this.state.room ? (
          <div className="game">
          <div className="location">Location:
        
        </div>
        <Link to="/">
          <div onClick={() => localStorage.clear()} className="logout">
            Logout
          </div>
        </Link>
            <p className="player">
              In this room: {this.state.room.name}
              {this.state.room.players.map(p => `, ${p}`)}
            </p>
            <p>{this.state.room.title}</p>
            <p>{this.state.room.description}</p>
            <div className="directions">
          <div className="direction-btn" onClick={() => this.move("n")}>
            North
          </div>
          <div className="direction-btn" onClick={() => this.move("e")}>
            East
          </div>
          <div className="direction-btn" onClick={() => this.move("s")}>
            South
          </div>
          <div className="direction-btn" onClick={() => this.move("w")}>
            West
          </div>
        </div>
        </div>
        ) : localStorage.getItem("key") ? (
          <p>loading...</p>
        ) : (
        <Link to = "/">
          <p className= "homepage-login">
          <p className= "login-text">LOGIN OR REGISTER</p>
        </p>
        </Link> )}
       
      </div>
    );
  }
}
export default Game;