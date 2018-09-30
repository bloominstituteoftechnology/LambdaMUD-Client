
import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

import './index.css';
const URL = process.env.REACT_APP_API;

class Display extends Component {
  constructor(props){
    super(props);
    this.state = {
      uuid: "",
      name: "",
      title: "",
      description: "",
      players: [],
      error_msg: "",
      chatString: "",
      history: [],
      direction: "",
    }
  }
  
    componentDidMount = () => {
      const key = localStorage.getItem("key")
      axios
        .get(`${URL}`+'adv/init/', { headers: { Authorization: `Token ${key}` } })
        .then(response => {
          this.setState({
            uuid: response.data.uuid,
            name: response.data.name,
            title: response.data.title,
            description: response.data.description,
            players: response.data.players
          })
        })
      }

        handleClick(event){
          const key = localStorage.getItem("key")
          
          axios.post(`${URL}`+'adv/move/', { "direction": this.state.direction }, {
            headers: {
              Authorization: `Token ${key}`,
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            this.setState({
              title: response.data.title,
              description: response.data.description,
              players: response.data.players,
              chatString: response.data.chatString,
              error_msg: response.data.error_msg,

            })
          console.log(response);
          });
       }
      

// Request: (Replace token string with logged in user's auth token)
// curl -X POST -H 'Authorization: Token 6b7b9d0f33bd76e75b0a52433f268d3037e42e66' -H "Content-Type: application/json" -d '{"direction":"n"}' localhost:8000/api/adv/move/
// Response:
// {"name": "testuser", "title": "Foyer", "description": "Dim light filters in from the south. Dusty\npassages run north and east.", "players": [], "error_msg": ""}

//  Initalize Response:
// {"uuid": "c3ee7f04-5137-427e-8591-7fcf0557dd7b", "name": "testuser", "title": "Outside Cave Entrance", "description": "North of you, the cave mount beckons", "players": []}


    

     render() {
        
         return (
        <div className='container'>
        <div className="field">
            <h2>Player Name<br></br>{this.state.name}</h2>
            <h3>Room title<br></br>{this.state.title}</h3>
            <h3>Room Description<br></br>{this.state.description}</h3>
            <h3>Number of Players<br></br>{this.state.players}</h3>
            <h3>Messages<br></br>{this.state.chatString}</h3>
            <h3>Errors<br></br>{this.state.error_msg}</h3>
        </div>

        <MuiThemeProvider>
          <div className="display" >
          <TextField 
             hintText="Enter your direction of travel"
             floatingLabelText="direction"
             onChange = {(event,newValue) => this.setState({direction:newValue})}
             />
             <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
        </div>
         );
     }       
}

export default Display;






