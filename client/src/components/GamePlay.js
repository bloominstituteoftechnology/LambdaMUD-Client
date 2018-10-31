import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
// const Pusher = require('pusher');
import Pusher from "pusher-js";
const apiInit = "https://lambdamud-backend.herokuapp.com/api/adv/init/"; //get

class GamePlay extends Component {
  state = {
    token: "",
    mounted: false,
    additionalInput: "",
    uuid: "",
    name: "",
    messages: [],
    moves: [],
    players: [],
    description: "",
    title: "",
    uuid: ""
  };

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const djangoToken = "Token " + token;
    const reqOptions = {
      headers: {
        Authorization: djangoToken
      }
    };

    const promise = axios.get(apiInit, reqOptions);
    promise
      .then(response => {
        console.log(response.data);
        const name = response.data.name;
        const players = response.data.players;
        const description = response.data.description;
        const title = response.data.title;
        const uuid = response.data.uuid;
        this.setState({ name, players, description, title, uuid });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  signOut = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/login");
  };

  pusherConnection = uuid => {
    const pusher = new Pusher("f8d751864d185f0a3c5b", {
      cluster: "us2",
      forceTLS: true
    });

    const channel = pusher.subscribe("p-channel-${uuid}", uuid);
    channel.bind("broadcast", function(data) {
      alert(JSON.stringify(data));
    });
    return channel;
  };

  render() {
    console.log(this.props);
    let keys = [];
    if (!this.props.location.state) {
      keys = [];
    } else {
      keys = Object.keys(this.props.location.state);
    }

    if (keys.includes("token")) {
      return (
        <div>
          <div>
            <h1>Inside the Game</h1>
            {/* <Link to = "/login"> */}
            <button onClick={this.signOut} className="web-btn">
              <span className="char2 title-first">S</span>
              <span className="char3 title-second">i</span>
              <span className="char4 title-third">g</span>
              <span className="char5 title-first">n</span>
              <span className="char1 title-second">O</span>
              <span className="char2 title-third">u</span>
              <span className="char2 title-first">t</span>
            </button>
            {/* </Link> */}
          </div>
        </div>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
    }
  }
}

export default GamePlay;
