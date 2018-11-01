import React, { Component } from "react";
import Axios from "axios";
import Login from "./Login";
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
    //e.preventDefault();
    let cmds = this.state.cmd.split(" ");
    let options = {
        headers: {
            Authorization: "Token 57ea421ed6e0b4e12116c83aeae1003d181d9108"
        }
    }
    if (dirs.includes(cmds[0])) {
      Axios.post(
        `${host}/api/adv/move`,
        {"direction": cmds[0]},
        options
      ).then((response) => {
          console.log(response.data)
        this.setState({reply: response.data.description});
        console.log(this.state.reply)
      }).catch((error) => {
          console.log(error.response)
      });
    } else {
      console.log("not a valid direction");
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
          <button type="button" onClick={this.action}>Go</button>
        </form>
      </div>
    );
  }
}

export default Adv;
