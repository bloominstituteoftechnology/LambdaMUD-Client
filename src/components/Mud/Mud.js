import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";
import "./Mud.css";
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
    if (localStorage.getItem("accessToken")) {
      axios
        .get("https://backend-mud-lambda.herokuapp.com/api/adv/init/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("accessToken")}`
          }
        })
        .then(response => {
          // sets uuid and initializes room with description
          this.state.uuid = response.data.uuid;
          document.getElementById("textArea").value += `${
            response.data.title
          }\n${response.data.description}\n`;
          // sets if any players are in the area
          response.data.players.map(p => {
            document.getElementById(
              "textArea"
            ).value += `\n${p} is standing there.`;
          });
          document.getElementById(
            "textArea"
          ).value += `\n\nInput n,s,e,w for north,south,east, and west to move accordingly\nType anything else to speak in chat.\n=================================================`;
          this.pusherSetup();
        })
        .catch(error => {});
    } else {
      document.getElementById(
        "textArea"
      ).value += `You are not logged in. Please go back to the Login Page`;
    }
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
          document.getElementById("textArea").value += `\n\n${
            response.data.title
          }\n${response.data.description}\n`;
          response.data.players.map(p => {
            document.getElementById(
              "textArea"
            ).value += `\n${p} is standing there.`;
          });
          document.getElementById(
            "textArea"
          ).value += `\n=================================================`;
          document.getElementById(
            "textArea"
          ).scrollTop = document.getElementById("textArea").scrollHeight;
        })
        .catch(error => {});
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
          document.getElementById("textArea").value += `\n\n${
            response.data.message
          }`;
          document.getElementById(
            "textArea"
          ).scrollTop = document.getElementById("textArea").scrollHeight;
        })
        .catch(error => {});
    }
  }

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  handleSubmit = event => {
    this.command();
    document.getElementById("input").value = "";
  };

  componentDidMount() {
    this.initMud();
  }

  render() {
    return (
      <div className="mud-wrapper">
        <div>
          {localStorage.getItem("accessToken") ? (
            <div
              className="log"
              onClick={() => {
                localStorage.removeItem("accessToken");
                this.props.history.push("/");
              }}
            >
              Log Out
            </div>
          ) : (
            <div
              className="log"
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              Log In
            </div>
          )}
        </div>
        <div className="mud-container">
          <textarea
            className="textarea"
            rows="20"
            cols="100"
            id="textArea"
            readOnly={true}
          />
        </div>
        <div>
          <form className="column-layout">
            <div className="form-input">
              <input
                id="input"
                value={this.state.input}
                name="input"
                type="text"
                placeholder="Please type here"
                onKeyPress={e => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                onChange={this.handleChange}
              />
            </div>
            <div
              className="form-button"
              onClick={() => {
                this.handleSubmit();
              }}
            >
              Submit
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Mud;
