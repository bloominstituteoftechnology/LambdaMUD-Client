import React, { Component } from "react";
import axios from "axios";

import RoomDetail from "./Room_detail";

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

  getRooms = () => {
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    axios
      .get("http://lambda-mud-test.herokuapp.com/api/adv/rooms/", {
        headers: header
      })
      .then(response => {
        this.setState({ room: response.data });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  // axios
  // .get('http://lambda-mud-test.herokuapp.com/api/adv/rooms/') //waiting for endpoint
  // .then(res => {
  //     this.setState({
  //         room: res.data
  //     })
  // })
  // .catch(e => {
  //     console.log(e)
  // })

  render() {
    console.log("state", this.state.room);

    const {room} = this.state
    let objValues = Object.values(room)

    let b = JSON.stringify(objValues)
    let c = JSON.parse(b)
    console.log(c)
    const { model, pk, fields } = c
    console.log('object', objValues)
    console.log('model', model)
    console.log('pk', pk)
    console.log('fields', fields)
    return (
      <div>
        {this.state.room
          ? this.state.room.map(room => (
              <RoomDetail room={room} key={room.title} />
            ))
          : null}
      </div>
    );
  }
}
