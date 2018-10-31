import React, { Component } from "react";
import { splitStringTransformer } from 'common-tags';
import axios from "axios";

class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      message: ""
    };
  }

  componentDidMount() {
    const headersAuthorization = {
      headers: { Authorization: `Token ${localStorage.getItem("key")}` }
    };
    axios
      .get(
        "https://lambdamud-alee.herokuapp.com/api/adv/init",
        headersAuthorization
      )
      .then(response => {
        this.setState({ player: response.data });
        console.log(this.state.player);
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
    const messageArr = this.state.message.split(" ");
    console.log(messageArr[0])
    if(messageArr[0] === "/s"){
        axios
        .post("https://lambdamud-alee.herokuapp.com/api/adv/say", this.state.message, headersAuthorization)
        .then(response => {
            this.setState({ 
                player: response.data,
                message: ""
            });
            console.log(this.state.player);
        })
        .catch(err => console.log(err));
    }
    else if(messageArr[0] === "n" || "s" || "e" || "w"){
        axios
        .post("https://lambdamud-alee.herokuapp.com/api/adv/move", messageArr[0], headersAuthorization)
        .then(response => {
            this.setState({ 
                player: response.data,
                message: ""
            });
            console.log(this.state.player);
        })
        .catch(err => console.log(err));
    }
    else{
        console.log("Not a valid command!")
    }
  };

  render() {
    return (
      <div>
        <h1> Yay LambdaMud!</h1>
        <button onClick={this.handleLogout}>Logout</button>
        <div>
          <ul>
            {/* {this.props.messages.map(message => {
              return (
                <li key={message.id}>
                  <div>{message.senderId}</div>
                  <div>{message.text}</div>
                </li>
              );
            })} */}
          </ul>
        </div>
        <div>
          <form onSubmit={this.submitCommand}>
            <input
              type="text"
              placeholder="Enter Command"
              onChange={this.handleTextChange}
              value={this.state.message}
              name="message"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default GameWindow;
