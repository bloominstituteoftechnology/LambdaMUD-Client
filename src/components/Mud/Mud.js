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
          console.log(response);
          document.getElementById("textArea").value += `\n\n${
            response.data.title
          }\n\n${response.data.description}\n`;
          response.data.players.map(p => {
            document.getElementById(
              "textArea"
            ).value += `${p} is standing there.`;
          });
          document.getElementById(
            "textArea"
          ).scrollTop = document.getElementById("textArea").scrollHeight;
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
          document.getElementById(
            "textArea"
          ).scrollTop = document.getElementById("textArea").scrollHeight;
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
          {localStorage.getItem("accessToken") ? (
            <div
              onClick={() => {
                localStorage.removeItem("accessToken");
                window.location.replace("/");
              }}
            >
              Log Out
            </div>
          ) : (
            <Link className="link-mud" to="/login">
              Login
            </Link>
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
                className="input"
                value={this.state.input}
                name="input"
                type="text"
                placeholder="Please type here"
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
