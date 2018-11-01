import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Pusher from "pusher-js";

class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        description: "",
        name: "",
        players: [],
        title: "",
        uuid: ""
      },
      messages: [],
      message: ""
    };
  }

  componentDidMount() {
    const headersAuthorization = {
      headers: { Authorization: `Token ${localStorage.getItem("key")}` }
    };
    console.log(localStorage.getItem("key"));
    axios
      .get(
        "https://lambdamud-alee.herokuapp.com/api/adv/init",
        headersAuthorization
      )
      .then(response => {
        this.setState({ player: response.data });
        console.log(this.state.player);
        const pusher = new Pusher("8b66e774f66ca1dd3215", {
          cluster: "us2"
        });
        const channel = pusher.subscribe(`p-channel-${response.data.uuid}`);
        channel.bind("broadcast", response => {
          const system = Object.values(response).toString();
          let messages = [...this.state.messages];
          messages.push(system);
          this.setState({ messages });
        });
      })
      .catch(err => console.log(err));
  }

  handleTextChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  submitCommand = event => {
    event.preventDefault();
    const headersAuthorization = {
      headers: { Authorization: `Token ${localStorage.getItem("key")}` }
    };
    console.log(localStorage.getItem("key"));
    const messageArr = this.state.message.toLowerCase().split(" ");
    console.log(messageArr[0]);
    if (messageArr[0] === "/s") {
      messageArr.shift();
      console.log(messageArr);
      let mymessage = messageArr.join(" ");
      console.log(mymessage);
      axios
        .post(
          "https://lambdamud-alee.herokuapp.com/api/adv/say/",
          { message: mymessage },
          headersAuthorization
        )
        .then(response => {
          this.setState({
            message: response.data.message
          });
          console.log(this.state.message);
          this.state.messages.push(this.state.message);
          this.setState({
            message: ""
          });
        })
        .catch(err => console.log(err));
    } else if (messageArr[0] === "go") {
      if (messageArr[1] === "n" || "s" || "e" || "w") {
        axios
          .post(
            "https://lambdamud-alee.herokuapp.com/api/adv/move/",
            { direction: messageArr[1] },
            headersAuthorization
          )
          .then(response => {
            this.setState({
              player: response.data,
              message: response.data.message
            });
            console.log(this.state.player);
            this.setState({
              message: ""
            });
          })
          .catch(err => console.log(err));
      }
    } else {
      console.log("Not a valid command!");
    }
  };

  render() {
    return (
      <div>
        <h1> Yay LambdaMud!</h1>
        <button onClick={this.handleLogout}>Logout</button>
        <div>
          <h2>Current Room</h2>
          <h3>{this.state.player.title}</h3>
        </div>
        <hr />
        <div>
          <h3>Room Description</h3>
          <h4>{this.state.player.description}</h4>
        </div>
        <hr />
        <div>
          <h3>Players in the Room</h3>
          {this.state.player.players.length !== 0 ? (
            <h4>{this.state.player.players.join(", ")}</h4>
          ) : (
            <h4>No One</h4>
          )}
        </div>
        <hr />
        <div>
          <form onSubmit={this.submitCommand}>
            <input
              type="text"
              placeholder="Enter Command"
              onChange={this.handleTextChange}
              value={this.state.message || ""}
              name="message"
            />
            <button>Submit</button>
          </form>
        </div>
        <div>
          {this.state.messages.map(message => {
            return (
              <div key={message}>
                <p>{message}</p>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GameWindow;
