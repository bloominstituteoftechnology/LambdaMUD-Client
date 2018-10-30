import React, { Component } from "react";
import axios from 'axios';

class Room extends Component {
  constructor() {
    super();
    this.state = {
      room: null,
      key: localStorage.getItem('key')
    };
  }
  componentDidMount() {
    if (localStorage.getItem("key")) {
      this.init()
    }
  }

  init = () => {
    // this.setState({key: localStorage.getItem('key')})
    // console.log(localStorage.getItem('key'))
    const header = {
      "Authorization": `Token ${this.state.key}`
    };
    axios.get("http://localhost:8000/api/adv/init/", { headers: header }) 
    .then(response => {
      this.setState({room: response.data});
    })
    .catch(error => {
      console.log(error.response);
    })
  }

  render() {
    return (
    <div>
       {this.state.room ? <div>
       <p>{this.state.room.title}</p>
       <p>{this.state.room.description}</p>
       </div>: null}
    </div>
    )
  }
}

export default Room;
