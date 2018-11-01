import React, { Component } from "react";
import axios from "axios";
import "./rooms.css";
import Pusher from "pusher-js";

// Room handles the "game" portion of the app. it holds the players whereabouts and allows for movement and "say" functionality

class Room extends Component {
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

  /* upon first load initialize the players room */
  componentDidMount() {
    if (localStorage.getItem("key")) {
      this.init();
    }
  }

  /* simple input handler */
  handleInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /* game initializer: sends a get request and saves the player's 
     room/details to state, specifically saves uuid to state.
     calls pusher to initialize that as well */
  init = () => {
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    axios
      .get("https://liz-mud.herokuapp.com/api/adv/init/", { headers: header })
      .then(response => {
        this.setState({ room: response.data });
        this.setState({ uuid: response.data.uuid });
        this.pusher();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  /* establishes connection to pusher using the players uuid stored on state */
  pusher = () => {
    const pusher = new Pusher("d0fbd4482a84b15b839e", {
      cluster: "us2"
    });
    const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
    channel.bind("broadcast", function(data) {
      alert(data.message);
    });
    Pusher.logToConsole = true;
  };

  /* sends a post request that includes a direction, refreshes state
     with the new room information */
  move = direction => {
    const header = {
      Authorization: `Token ${this.state.key}`,
      "Content-Type": "application/json"
    };
    axios
      .post(
        "https://liz-mud.herokuapp.com/api/adv/move/",
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

  /* sends a post request that includes a message from the player. if other players
    are in the room they recieve a pusher notifiation with the message, if not
    the player recieves an alert that there is no one to message */
  say = msg => {
    const header = {
      Authorization: `Token ${this.state.key}`,
      "Content-Type": "application/json"
    };
    axios
      .post(
        "https://liz-mud.herokuapp.com/api/adv/say/",
        { message: msg },
        { headers: header }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response)
        alert("No one is around to hear...");
      });
      this.setState({msg: ""})
  };

  render() {
    return (
      <div>
        {this.state.room ? (
          <div className="game">
            <p className="player">
              In this room: {this.state.room.name}
              {this.state.room.players.map(p => `, ${p}`)}
            </p>
            <p>{this.state.room.title}</p>
            <p>{this.state.room.description}</p>
            <div className="directions">
          <div className="dir-btn" onClick={() => this.move("n")}>
            North
          </div>
          <div className="dir-btn" onClick={() => this.move("e")}>
            East
          </div>
          <div className="dir-btn" onClick={() => this.move("s")}>
            South
          </div>
          <div className="dir-btn" onClick={() => this.move("w")}>
            West
          </div>
        </div>
            <div className="chat">
              {/* was going to keep a record of messages but may scrap
              <div>
                {this.state.chat.map(msg => (
                  <p>{msg}</p>
                ))}
              </div> */}
              <span>{this.state.room.name}:</span>{" "}
              <input
                value = {this.state.msg}
                onChange={this.handleInput}
                id="msg"
                placeholder=" message"
              />
              <button type="submit" onClick={() => this.say(this.state.msg)}>
                enter
              </button>
            </div>
          </div>
        ) : localStorage.getItem("key") ? (
          <p>loading...</p>
        ) : (<p>please log in to play</p>)}
      </div>
    );
  }
}

export default Room;
