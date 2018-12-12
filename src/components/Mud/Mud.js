import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
require("dotenv").config();

class Mud extends Component {
  state = {
    input: "",
    uuid: ""
  };

  pusherSetup() {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
    var pusher = new Pusher("858967c7631c17228127", {
      cluster: "us2",
      forceTLS: true
    });
    var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
    channel.bind("broadcast", function(data) {
      document.getElementById("textArea").value += `\n${data.message}`;
    });
  }

  // initializes mud
  initMud() {
    axios
      .get("https://backend-mud-lambda.herokuapp.com/api/adv/init/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("accessToken")}`
        }
      })
      .then(response => {
        console.log(response);
        this.state.uuid = response.data.uuid;
        document.getElementById("textArea").value += `${
          response.data.title
        }\n\n${response.data.description}`;
        response.data.players.map(p => {
          document.getElementById(
            "textArea"
          ).value += `${p} is standing there.`;
        });
        this.pusherSetup();
      })
      .catch(error => {
        console.log(error);
      });
  }

  // checks what the input is and does proper request
  command() {
    if (
      (this.state.input === "n") |
      (this.state.input === "e") |
      (this.state.input === "w") |
      (this.state.input === "s")
    ) {
      axios
        .post(
          "https://backend-mud-lambda.herokuapp.com/api/adv/move/",
          { direction: `${this.state.input}` },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("accessToken")}`
            }
          }
        )
        .then(response => {
          console.log(response);
          document.getElementById("textArea").value += `\n\n${
            response.data.title
          }\n\n${response.data.description}`;
          response.data.players.map(p => {
            document.getElementById(
              "textArea"
            ).value += `\n${p} is standing there.`;
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // If not a direction then produces say
      axios
        .post(
          "https://backend-mud-lambda.herokuapp.com/api/adv/say/",
          { message: `${this.state.input}` },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("accessToken")}`
            }
          }
        )
        .then(response => {
          console.log(response.data.message);
          document.getElementById("textArea").value += `\n\n${
            response.data.message
          }`;
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  handleSubmit = event => {
    this.command();
  };

  componentDidMount() {
    this.initMud();
  }

  render() {
    return (
      <div>
        <div>
          <textarea rows="20" cols="100" id="textArea" readOnly={true} />
        </div>
        <div>
          <form className="Column-Layout">
            <input
              className="input"
              value={this.state.input}
              name="input"
              type="text"
              placeholder="Please type here"
              onChange={this.handleChange}
            />
            <h3 onClick={this.handleSubmit}>Submit</h3>
          </form>
        </div>
      </div>
    );
  }
}

export default Mud;
