import React, { Component } from "react";
import "../App.css";
import Authenticate from "./Authenticate";
import axios from "axios";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        name: "",
        title: "",
        description: "",
        error_msg: "",
        players: [],
      },
      message: ""
    };
  }

  componentDidMount() {
    axios
      .get("https://blakes-lambda-mud.herokuapp.com/api/adv/init", {
        headers: {
          Authorization: "Token " + localStorage.getItem("key")
        }
      })
      .then(response => {
        this.setState({ player: response.data });
      });
  }

  moveHandler = e => {
  
    axios
      .post(
        "https://blakes-lambda-mud.herokuapp.com/api/adv/move/",
        { direction: e.target.getAttribute("direction") }, // https://stackoverflow.com/questions/39670263/javascript-get-attributes-of-clicked-button
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("key"),
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        this.setState({ player: response.data });
      })
      .catch(err => console.log(err))
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sayHandler = e => {
    e.preventDefault();
    this.setState({message: ""})
    axios
      .post(
        "https://blakes-lambda-mud.herokuapp.com/api/adv/say/",
        { "message": this.state.message }, // https://stackoverflow.com/questions/39670263/javascript-get-attributes-of-clicked-button
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("key"),
            "Content-Type": "text/plain; charset=utf-8"
          }
        }
      )
      .then(response => {
        console.log({ message: response.data.message });
      })
      .catch(err => console.log(err.response))
  };

  render() {
      console.log(this.state.message)
    return (
      <div>
        <h2>Welcome to the Lambda Adventure game, {this.state.player.name}!</h2>
        <h3>Current room: {this.state.player.title}</h3>
        <p>
          <b>{this.state.player.description}</b>
        </p>
        <h3>Other players in the room: {this.state.player.players}</h3>
        <p>Make your move!</p>
        <button direction="n" onClick={this.moveHandler}>
          Up
        </button>
        <button direction="s" onClick={this.moveHandler}>
          Down
        </button>
        <button direction="w" onClick={this.moveHandler}>
          Left
        </button>
        <button direction="e" onClick={this.moveHandler}>
          Right
        </button>
        <p style={{ color: "red" }}>
          <i>{this.state.player.error_msg}</i>
        </p>
        <form onSubmit={this.sayHandler}>
        <input 
            type="text"
            placeholder="Enter a message..."
            name="message" 
            value={this.state.message}
            onChange={this.inputHandler} />
        <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Authenticate(Game);
