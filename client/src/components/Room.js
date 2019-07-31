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
          console.log('RAW RES FORM DATA ', response.data.rooms)
          const a = Object.values(response.data)
          const b = JSON.parse(a)
          console.log('B  ', b[0].fields)
          let newArray = [] // push field object from the res.data into a new array 
          b.forEach(cv => {
              newArray.push(cv.fields)
          })
          
        this.setState({ room: newArray });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    const {room} = this.state
    room.forEach(cv=>console.log('cv',cv))
    console.log("state", room);
    
    return (
      <div>
        {this.state.room
          ? this.state.room.map(room => (
              <RoomDetail room={room} key={room.title} />
            ))
          : console.log('no keys')}
      </div>
    );
  }
}
