import React, { Component } from "react";
import axios from "axios";

import Map from "./Map";

export default class Init extends Component {
  state = {
    uuid: "",
    name: "",
    title: "",
    description: "",
    players: [],
    key: localStorage.getItem("key")
  };
  componentDidMount() {
    if (localStorage.getItem("key")) {
      this.init();
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  init = () => {
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    console.log("HEADER", header);
    axios
      .get("https://f-troop-adventures.herokuapp.com/api/adv/init/", {
        headers: header
      })
      .then(res => {
        this.setState({
          uuid: res.data.uuid,
          name: res.data.name,
          title: res.data.title,
          description: res.data.description,
          players: res.data.players
        });
      });
  };

  handleMove = (direction) => {
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    axios
      .post(
        "https://f-troop-adventures.herokuapp.com/api/adv/move/",
        { direction: direction },
        {
          headers: header
        }
      )
      .then(res => {
        console.log("MOVE RES", res.data.title);
        this.setState({
          title: res.data.title, description: res.data.description
        })
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { uuid, name, title, description, players } = this.state;
    return (
      <div>
        <h3>Your information:</h3>
        <p>{uuid}</p>
        <p>Your name: {name}</p>
        <p>you are here at {title}</p>
        <p>
          other player in the same area as you: {players.map(player => player)}
        </p>
        <Map />
        
        <div className="directions">
          <button
            className="direction-btn"
            onClick={() => this.handleMove("n")}
            >
            North
          </button>
          <button
            className="direction-btn"
            onClick={() => this.handleMove("e")}
            >
            East
          </button>
          <button
            className="direction-btn"
            onClick={() => this.handleMove("s")}
            >
            South
          </button>
          <button
            className="direction-btn"
            onClick={() => this.handleMove("w")}
            >
            West
          </button>
          
        </div>
        <div>
        <h2>{title}</h2>
        <p>{description}</p>
        </div>
        
      </div>
    );
  }
}
