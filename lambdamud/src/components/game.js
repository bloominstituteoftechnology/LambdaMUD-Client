import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pusher from 'pusher-js'

class Game extends Component {
  state = {
    player: {
      name: "",
      title: "",
      description: "",
      uuid: ""
    },
    input: ""
  };

  componentDidMount() {
    let key = "Token " + localStorage.getItem("key");
    const local = "http://127.0.0.1:8000";
    const herokurl = "https://lambdamud-griggs.herokuapp.com";
    axios
      .get(`${herokurl}/api/adv/init`, {
        headers: {
          Authorization: key
        }
      })
      .then(response => {
        this.connectToPusher(response.data.uuid);
        this.setState({ player: response.data });
      })
      .catch(error => {
        console.error(error.response);
      });
  }

  connectToPusher = uuid => {
    const pusher = new Pusher("96249e373b038ddb105d", {
      cluster: "us2",
      forceTLS: true
    });
    const channel = pusher.subscribe(`p-channel-${uuid}`, uuid);
    channel.bind('broadcast', function(data) {
      alert(data.message);
    })
    Pusher.logToConsole = true
  };

  render() {
    return (
      <div className="game-container">
        <div> {this.state.player.name}</div>
        <div> {this.state.player.title}</div>
        <div> {this.state.player.description}</div>
        {/* <div> {this.state.player.uuid}</div> */}
        <form onSubmit={this.submitHandler}>
          <input
            value={this.state.input}
            onChange={this.inputChangeHandler}
            type="text"
            name="input"
            placeholder="What will you do?"
          />
          <button type="submit">Go</button>
        </form>
      </div>
    );
  }

  inputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    const local = "http://127.0.0.1:8000";
    const herokurl = "https://lambdamud-griggs.herokuapp.com";
    let key = `Token ${localStorage.getItem("key")}`;
    if (this.state.input.startsWith("move")) {
      const direction = this.state.input[5];
      console.log(direction);
      axios
        .post(
          `${herokurl}/api/adv/move/`,
          { direction: direction },
          {
            headers: {
              Authorization: key,
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.setState({ player: response.data });
          this.connectToPusher(this.state.player.uuid);
        })
        .catch(error => {
          console.log(error.response);
        });
    }

    if (this.state.input.startsWith("say")) {
      const message = this.state.input.slice(4);
      console.log(message);
      axios
        .post(
          `${herokurl}/api/adv/say`,
          { message: message },
          {
            headers: {
              Authorization: key,
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.setState({ player: response.data });
          this.connectToPusher();
        });
    } else {
      console.log("Not a command");
    }
    this.setState({ input: "" });
  };
}

export default Game;



