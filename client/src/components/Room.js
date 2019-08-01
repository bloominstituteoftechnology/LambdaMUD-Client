import React, { Component } from "react";
import axios from "axios";
import Map from './Map'
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

  handleMove_n = (e)=>{
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    axios
    .post("http://lambda-mud-test.herokuapp.com/api/adv/move/", {headers: header, direction:'n'})
    .then(res => {
        console.log(res.data.result)
        const { result }= res.data
        result.forEach(cv=> {
          if (cv.n_to){
            return(cv.description)
          }
          else{
            throw new Error('nope')
          }
        })
        
    })
    .catch(error => {
        console.log(error.response);
    });
  }
  handleMove_w = (e)=>{
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    axios
    .post("https://f-troop-adventures.herokuapp.com/api/adv/move/", {headers: header, direction:'w'})
    .then(res => {
        console.log(res.data)
    })
    .catch(error => {
        console.log(error.response);
    });
  }
  handleMove_e = (e)=>{
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    axios
    .post("https://f-troop-adventures.herokuapp.com/api/adv/move/", {headers: header, direction:'e'})
    .then(res => {
        console.log(res.data)
    })
    .catch(error => {
        console.log(error.response);
    });
  }
  handleMove_s = (e)=>{
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    axios
    .post("https://f-troop-adventures.herokuapp.com/api/adv/move/", {headers: header, direction:'s'})
    .then(res => {
        console.log(res.data)
    })
    .catch(error => {
        console.log(error.response);
    });
  }




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
    // const {room} = this.state //to see if there are data in the state
    // room.forEach(cv=>console.log('cv',cv))
    // console.log("state", room); //--->checking data in state
    
    return (
      <div>
        <Map />
        {this.state.room
          ? this.state.room.map(room => (
              <RoomDetail room={room} key={room.title} />
            ))
          : console.log('no keys')}
        <button onClick={this.handleMove_n} name='n'>n</button> 
        <button onClick={this.handleMove_w} name='w'>w</button> 
        <button onClick={this.handleMove_e} name='e'>e</button> 
        <button onClick={this.handleMove_s} name='s'>s</button> 
      </div>
    );
  }
}
