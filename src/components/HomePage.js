import React from "react";
import axios from "axios";
import Messages from "./Messages";
import Pusher from "pusher-js";
import { setPusherClient } from "react-pusher";
import "./HomePage.css";

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
          new_msg.push({ name: data.name, message: data.message });
          this.setState({ permanentMessages: new_msg });
        });
      })
      .catch(err => {
        alert(err.message);
      });
  }

  playerInput = event => {
    this.setState({ messages: event.target.value });
  };

  submitGo = event => {
    event.preventDefault();
    let token = localStorage.getItem("token").slice(1, -1);
    let authHeader = {
      headers: {
        Authorization: "Token " + token
      }
    };
    let newMove = this.state.messages[0].toLowerCase();
    let direction = { direction: newMove };
    axios
      .post("https://nicky-adventuregame.herokuapp.com/api/adv/move/", direction, authHeader)
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          messages: ""
        });
      })
      .catch(err => {
        alert(err.message);
      });
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
        console.log("response.data is:", response.data);
        this.setState({ permanentMessages: oldMessages, messages: "" });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  submitInput = event => {
    event.preventDefault();
    let typeMessages = this.state.messages;
    if (
      typeMessages === "north" ||
      typeMessages === "south" ||
      typeMessages === "west" ||
      typeMessages === "east" ||
      typeMessages === "n" ||
      typeMessages === "s" ||
      typeMessages === "w" ||
      typeMessages === "e"
    ) {
      this.submitGo(event);
    } else {
      this.submitMessage(event);
    }
  };

  logout = event => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.reload();
  };

  render() {
    return (
      <div className="home-page">
        <div className="home-page-card">
          <div className="home-page-top">
            <h1 className="title">
              <strong>{this.state.title}</strong>
            </h1>
            <p className="description">{this.state.description}</p>
          </div>

          <button className="logout" onClick={this.logout}>
            Logout
          </button>
          <div className="homepage-messages">
            <h4 className="game-messages">Players In Game: </h4>
            <div>
              {this.state.permanentMessages ? (
                <div>
                  {this.state.permanentMessages.map(message => (
                    <Messages key={Math.random()} message={message} />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <form className="inputForm">
            <input
              className="inputMessages"
              value={this.state.messages}
              name="move"
              onChange={this.playerInput}
              type="text"
              placeholder="Enter directions to walk, or chat with other players."
            />
            <button className="hiddenButton" onClick={this.submitInput}>
              Go
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default HomePage;
