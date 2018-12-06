import React, { Component } from 'react';
import axios from 'axios';

import Button from '../Button';

import './index.css';

class CommandInput extends Component {
  state = {
    token: localStorage.getItem("token"),
    url: "https://lambda-mud-alex.herokuapp.com/",
    commandText: "",
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCommand = event => {
    event.preventDefault();
    const { commandText } = this.state;
    let dir = ["n", "s", "e", "w"];
    if( commandText.length > 1) {
      this.say(commandText);
    }
    if (dir.includes(commandText)) {
      this.move(commandText);
    }
    this.setState({ commandText: "" })
  }

  move = command => {
    let data = { "direction": command };
    const { moveRooms } = this.props;
    axios.post(`${this.state.url}api/adv/move`, data, {
      headers: {
        "Authorization": "Token " + this.state.token,
      }
    })
      .then(response => {
        moveRooms(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  say = command => {
    let data = { "message": command };
    const { updateMsg } = this.props;
    axios.post(`${this.state.url}api/adv/say`, data, {
      headers: {
        "Authorization": "Token " + this.state.token,
      }
    })
      .then(response => {
        updateMsg(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    return(
      <div className="Command">
        <input
          className="CommandInput"
          value={this.state.commandText}
          name="commandText"
          onChange={this.handleChange}
        />
        <Button text="Send" event={this.handleCommand}/>
      </div>
    )
  }
}

export default CommandInput;