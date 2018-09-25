import React from "react";
import axios from "axios";
import Messages from "./Messages";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      players: "",
      move: "",
      messages: ""
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
        console.log("title is: ", this.state.title);
      })
      .catch(err => {
        console.log(err.message);
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
            name="message"
            onChange={this.inputMessage}
            type="text"
            placeholder="Enter your message here"
          />
          <button onClick={this.submitMessage}>Message</button>
          <h2>Game Messages: </h2>
          <div>
            {this.state.messages ? (
              <div>
                {this.state.messages.map(message => (
                  <Messages message={message} />
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
