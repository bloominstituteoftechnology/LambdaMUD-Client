import React, { Component } from "react";
import Auth from "./Auth";
import axios from "axios";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";

class HomePage extends Component {
  state = {
    name: "",
    title: "",
    description: "",
    players: [],
    inputString: "",
    history: []
  };

  componentDidMount = () => {
    const key = localStorage.getItem("key");
    axios
      .get("https://lambdamudprojectwekk.herokuapp.com/api/adv/init/", {
        headers: { Authorization: `Token ${key}` }
      })
      .then(response => {
        this.connectToPusher(response.data.uuid);
        this.setState(
          {
            name: response.data.name,
            title: response.data.title,
            description: response.data.description,
            players: response.data.players
          },
          () => this.updateHistory()
        );
      })
      .catch(err => console.log(err));
    window.addEventListener("keydown", this.handleKeyDown);
  };

  componentDidUpdate() {
    const history = document.getElementById("history");
    history.scrollTop = history.scrollHeight;
  }

  componentWillMount = () => {
    window.removeEventListener("keydown", this.handleKeyDown);
  };

  connectToPusher = uuid => {
    const pusher = new Pusher("f4b37dcf288781e6113a", {
      cluster: "us2",
      forceTLS: true
    });
    const channel = pusher.subscribe(`p-channel-${uuid}`, uuid);
    channel.bind("broadcast", data => {
      console.log("data message", data.message);
      this.updateHistory(data.message);
    });
  };

  handleKeyDown = event => {
    const code = event.keyCode;
    const mappings = { 37: "w", 38: "n", 39: "e", 40: "s" };
    if (code in mappings) {
      const direction = mappings[code];
      this.handleMove(direction);
    }
  };

  handleMove = direction => {
    const key = localStorage.getItem("key");
    axios
      .post(
        "https://lambdamudprojectwekk.herokuapp.com/api/adv/move/",
        { direction: direction },
        {
          headers: {
            Authorization: `Token ${key}`,
            "Content-Type": "application / json"
          }
        }
      )
      .then(response => {
        if (response.data.error_msg) {
          this.updateHistory(response.data.error_msg);
        } else {
          this.setState(
            {
              name: response.data.name,
              title: response.data.title,
              description: response.data.description,
              players: response.data.players
            },
            () => this.updateHistory()
          );
        }
      })
      .catch(err => console.log(err));
  };

  inputHandleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  messageSubmitHandle = event => {
    event.preventDefault();
    if (this.state.inputString === "") {
      return;
    }
    const key = localStorage.getItem("key");
    axios
      .post(
        "https://lambdamudprojectwekk.herokuapp.com/api/adv/say/",
        { message: this.state.inputString },
        {
          headers: {
            Authorization: `Token ${key}`,
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        this.setState(
          {
            inputString: ""
          },
          () => this.updateHistory(response.data.message)
        );
      })
      .catch(err => console.log(err));
  };

  updateHistory = (message = null) => {
    const history = this.state.history;
    let newHistoryItem;
    if (message !== null) {
      newHistoryItem = { message: message };
    } else {
      newHistoryItem = {
        title: this.state.title,
        description: this.state.description,
        players: this.state.players
      };
    }
    history.unshift(newHistoryItem);
    this.setState({ history: history });
  };

  render() {
    const history = this.state.history.slice().reverse();
    return (
      <div className="game-container">
        <div className="name-and-logout-container">
          <div className="username">
            {this.state.name}
            <i className="fas fa-gamepad" />
          </div>
          {/* <div className="directions">use arrow keys to move</div> */}
          <div onClick={this.props.logout} className="logout">
            <i className="fas fa-sign-out-alt" />
          </div>
        </div>
        <div className="history-and-text-input-container">
          <div className="history-container-container">
            <div className="history-container" id="history">
              {history.map(historyItem => {
                if (historyItem["message"]) {
                  return (
                    <div key={Math.random()} className="history-item">
                      <div className="message">{historyItem.message}</div>
                    </div>
                  );
                } else {
                  return (
                    <div key={Math.random()} className="history-item">
                      <div className="title">{historyItem.title}</div>
                      <div className="description">
                        {historyItem.description}
                      </div>
                      <div className="players">
                        {historyItem.players.join(", ")}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="text-input-container">
            <form onSubmit={this.messageSubmitHandle} autoComplete="off">
              <input
                placeholder="Talk to other players"
                name="inputString"
                value={this.state.inputString}
                onChange={this.inputHandleChange}
              />
              <div className="send">
                <button>Send</button>
              </div>
            </form>
            <div className="logout">
              <Link to="/" className="register-link">
                <button type="submit">Logout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth(HomePage);
