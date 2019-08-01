import React, { Component } from "react";
import axios from "axios";
import Map from "../Map";
import RoomDetail from "../Room_detail";

export default class Room extends Component {
  state = {
    room: [],
    key: localStorage.getItem("key")
  };

  componentDidMount() {
    if (localStorage.getItem("key")) {
      this.getRooms();
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.id]: event.target.value
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
  getRooms = () => {
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    axios
      .get("https://f-troop-adventures.herokuapp.com/api/adv/rooms/", {
        headers: header
      })
      .then(response => {
        // console.log('RAW RES FORM DATA ', response.data.result) //---checking data responses

        this.setState({ room: response.data.result });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <div>
        <Map />
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
