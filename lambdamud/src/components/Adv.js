import React, { Component } from "react";
import Axios from "axios";
import Auth from "./Login";
const host = "https://stefarg-lambdamud.herokuapp.com";

const dirs = ["n", "north", "s", "south", "e", "east", "w", "west"];

class Adv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      cmd: ""
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  action = e => {
    e.preventDefault();
    let cmds = this.state.cmd.split(" ");
    let options = {
      headers: {
        Authorization: `${localStorage.Auth}`
      }
    };
    if (cmds.length < 2) {
      if (dirs.includes(cmds[0])) {
        Axios.post(`${host}/api/adv/move`, { direction: cmds[0] }, options)
          .then(response => {
            console.log(response.data);
            this.setState({ reply: response.data.description });
            console.log(this.state.reply);
          })
          .catch(error => {
            console.log(error.response);
          });
      } else {
        console.log("not a valid direction");
      }
    } else {
      if (cmds[0] = "say") {
        let msg = cmds.slice(1);
        msg = msg.join(" ");
        Axios.post(`${host}/api/adv/say`, { message: msg }, options)
        .then(response => {
          console.log(response.data);
          this.setState({ reply: response.data.description });
          console.log(this.state.reply);
        })
      }
    }
  };

  render() {
    return (
      <div>
        <p>{`${this.state.reply}`}</p>
        <form onSubmit={this.action}>
          <input
            onChange={this.handleInputChange}
            placeholder="What will you do?"
            value={this.state.cmd}
            name="cmd"
          />
          <button type="button" onClick={this.action}>
            Go
          </button>
        </form>
      </div>
    );
  }
}

export default Adv;
