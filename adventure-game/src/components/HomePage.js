import React from "react";
import axios from "axios";
import Messages from "./Messages";
import Pusher from "pusher-js";
import { setPusherClient } from "react-pusher";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const socket = new Pusher("216a62e97dcc1c57dcf9", {
  cluster: "us2",
  forceTLS: true
});

setPusherClient(socket);

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      players: "",
      move: "",
      messages: "",
      permanentMessages: []
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token").slice(1, -1);
    const authHeader = {
      headers: {
        Authorization: "Token " + token
      }
    };
    axios
      .get("https://nicky-adventuregame.herokuapp.com/api/adv/init/", authHeader)
      .then(response => {
        this.setState({ title: response.data.title, description: response.data.description });
        let channel = socket.subscribe("p-channel-" + response.data.uuid);
        channel.bind("broadcast", data => {
          let new_msg = this.state.permanentMessages.slice();
          new_msg.push({ message: data.message });
          this.setState({ permanentMessages: new_msg });
        });
      })
      .catch(err => {
        alert(err.message);
      });
  }
  playerInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitGo = event => {
    event.preventDefault();
    let token = localStorage.getItem("token").slice(1, -1);
    let authHeader = {
      headers: {
        Authorization: "Token " + token
      }
    };
    let newMove = this.state.move[0].toLowerCase();
    let direction = { direction: newMove };
    axios
      .post("https://nicky-adventuregame.herokuapp.com/api/adv/move/", direction, authHeader)
      .then(response => {
        this.setState({ title: response.data.title, description: response.data.description });
      })
      .catch(err => {
        alert(err.message);
      });
  };
  inputMessage = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitMessage = event => {
    event.preventDefault();
    let token = localStorage.getItem("token").slice(1, -1);
    let authHeader = {
      headers: {
        Authorization: "Token " + token
      }
    };
    let message = {
      message: this.state.messages
    };
    axios
      .post("https://nicky-adventuregame.herokuapp.com/api/adv/say/", message, authHeader)
      .then(response => {
        let oldMessages = this.state.permanentMessages.slice();
        oldMessages.push(response.data);
        this.setState({ permanentMessages: oldMessages });
        let channel = socket.subscribe("p-channel-" + response.data.uuid);
        channel.bind("broadcast", data => {
          console.log("data is: ", data);
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div>
        <p>
          <strong>{this.state.title}</strong>
        </p>
        <p>{this.state.description}</p>
        <form>
          <p>Where would you like to go?</p>
          <input name="move" onChange={this.playerInput} type="text" placeholder="Enter here" />
          <button onClick={this.submitGo}>Go</button>
        </form>
        <form>
          <p>What would you like to say?</p>
          <input
            name="messages"
            onChange={this.inputMessage}
            type="text"
            placeholder="Enter your message here"
          />
          <button onClick={this.submitMessage}>Message</button>
          <h2>Game Messages: </h2>
          <div>
            {this.state.permanentMessages ? (
              <div>
                {this.state.permanentMessages.map(message => (
                  <Messages key={Math.random()} message={message} />
                ))}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
}

export default HomePage;
