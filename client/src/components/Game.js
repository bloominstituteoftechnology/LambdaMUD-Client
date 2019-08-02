import React, { Component } from "react";
import axios from "axios";

import Map from "./Map";
import RoomDetail from "./Room_detail";

export default class Init extends Component {
  state = {
    uuid: "",
    name: "",
    title: "",
    description: "",
    direction: "",
    players: [],
    room: [],
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

  handleMove = e => {
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    axios
      .post("https://f-troop-adventures.herokuapp.com/api/adv/move/", {
        direction: "n",
        headers: header
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.response);
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
        <p>{description}</p>
        <p>
          other player in the same area as you: {players.map(player => player)}
        </p>

        {this.state.room
          ? this.state.room.map(room => (
              <RoomDetail room={room} key={room.title} />
            ))
          : console.log("no keys")}
        <button onClick={this.handleMove} name="n">
          btn
        </button>
      </div>
    );
  }
}
