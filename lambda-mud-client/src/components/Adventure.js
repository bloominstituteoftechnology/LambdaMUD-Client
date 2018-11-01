import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";

class Adventure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: true,
      user: "",
      uuid: "",
      message: "",
      direction: "",
      errors: "",
      messages: [],
      players: [],
      chat: ""
    };
  }

  componentDidMount = () => {
    if (!localStorage.getItem("Token")) {
      this.setState({ authorized: false });
      this.props.history.push("/login");
    }

    const authHeader = {
      headers: { Authorization: `Token ${localStorage.getItem("Token")}` }
    };

    axios
      .get("https://lambda-mud-dpok.herokuapp.com/api/adv/init", authHeader)
      .then(response => {
        console.log("response", response);
        const { title, description } = response.data;
        console.log("Cdm");
        this.setState({
          user: response.data.name,
          uuid: response.data.uuid,
          message: `${title}: ${description}`,
          messages: [...this.state.messages, `${title}: ${description}`],
          players: response.data.players
        });

        var pusher = new Pusher("2fcc2022c5616f3379a9", {
          cluster: "us2"
        });

        var channel = pusher.subscribe("p-channel-" + response.data.uuid);
        console.log("CDM");
        channel.bind("broadcast", response => {
          console.log("pshData", response.message);
          this.setState({
            message: response.message,
            messages: [...this.state.messages, response.message]
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    const { direction, messages } = this.state;
    event.preventDefault();

    const authHeaders = {
      headers: { Authorization: `Token ${localStorage.getItem("Token")}` }
    };

    if (
      direction === "n" ||
      direction === "s" ||
      direction === "e" ||
      direction === "w"
    ) {
      console.log("direction", { direction });
      axios
        .post(
          "https://lambda-mud-dpok.herokuapp.com/api/adv/move/",
          { direction },
          authHeaders
        )
        .then(response => {
          const { title, description, players } = response.data;
          this.setState({
            message: `${title}: ${description}`,
            messages: [
              ...messages,
              `you move ${direction}`,
              `${title}: ${description}`
            ],
            direction: "",
            players: players
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  chatHandler = event => {
    event.preventDefault();

    const authHeaders = {
      headers: { Authorization: `Token ${localStorage.getItem("Token")}` }
    };
    console.log(this.state.chat, "chat");
    axios
      .post(
        "https://lambda-mud-dpok.herokuapp.com/api/adv/say/",
        { message: this.state.chat },
        authHeaders
      )
      .then(response => {
        console.log("chatHandler", response);
        this.setState({
          chat: ""
        });
      });
  };

  logoutHandler = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="main-page">
        <h2> Welcome, {this.state.user} </h2>
        {this.state.messages.map(message => {
          return (
            <div className="message">
              <p>{message}</p>
            </div>
          );
        })}
        <p>Use 'n' 's' 'w' 'e' to move</p>
        <form onSubmit={this.submitHandler}>
          <div className="directionForm">
            <input
              value={this.state.direction}
              onChange={this.inputChangeHandler}
              type="text"
              placeholder="Enter direction"
              className="form-control"
              name="direction"
            />
            <button type="submit" className="btn btn-primary">
              Enter
            </button>
          </div>
        </form>
        <div className="error">{this.state.errors}</div>
        <div className="players">
          <h2> Players in Room </h2>
          {/* {this.state.players} */}
          {this.state.players.map(player => {
            return <div>{player}</div>;
          })}
        </div>
        <div className="chat">
          <h2>Send Message to Players in Room:</h2>
          <form onSubmit={this.chatHandler} className="form-group">
            <input
              value={this.state.chat}
              onChange={this.inputChangeHandler}
              placeholder="Message"
              type="text"
              className="form-control"
              name="chat"
            />
            <button type="submit" className="btn btn-success">
              Send
            </button>
          </form>
        </div>
        <button onClick={this.logoutHandler} className="btn btn-warning">
          Log Out
        </button>
      </div>
    );
  }
}

export default Adventure;
