import React, { Component } from "react";
import { Redirect } from "react-router";
import {Link} from "react-router-dom";
import axios from "axios";
import Pusher from "pusher-js";
const urlInit = "https://mudlambdahuthman.herokuapp.com/api/adv/init/"; 
const urlMove = "https://mudlambdahuthman.herokuapp.com/api/adv/move/";
const urlSay = "https://mudlambdahuthman.herokuapp.com/api/adv/say";

class Game extends Component {
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
      channel: "",
      command_type : "move",
    };
  
    componentDidMount() {
      const token = localStorage.getItem("jwt");
      const djangoToken = "Token " + token;
      const reqOptions = {
        headers: {
          Authorization: djangoToken
        }
      };
  
      const promise = axios.get(urlInit, reqOptions);
      promise
        .then(response => {
          console.log(response.data);
          const name = response.data.name;
          const players = response.data.players;
          const description = response.data.description;
          const title = response.data.title;
          const uuid = response.data.uuid;
          const moves = [
            {
              players: response.data.players,
              description: response.data.description,
              title: response.data.title
            }
          ];
          this.setState({ name, players, description, title, uuid, moves });
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
      const pusher = new Pusher("1b4118407e6882f44d92", {
        cluster: "us2",
        forceTLS: true
      });
  
      const channel = pusher.subscribe(`p-channel-${uuid}`, uuid);
      channel.bind("broadcast", function(data) {
        alert(JSON.stringify(data));
      });
      return channel;
    };
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
    handleEnter = event => {
        event.preventDefault()
        const directionOrMessage = this.state.additionalInput.slice().toLowerCase()
        console.log(directionOrMessage)
        // check the command_type move for saying something 
        if (this.state.command_type === "say"){
          this.handleSay(directionOrMessage)
        } else {
            if (directionOrMessage.includes('n')){
                this.handleMove('n')
            } else if (directionOrMessage.includes('s')){
                this.handleMove('s')
            } else if (directionOrMessage.includes('e')){
                this.handleMove('e')
            } else if (directionOrMessage.includes('w')){
                this.handleMove('w')
            }
        }
    }
    handleMove = (direction) => {
  
    }
  
    handleSay = (message) => {
  
    }
  
    handleClick = command_type => {
      this.setState({command_type})
    }
  
    render() {
     
      const moves = this.state.moves.slice()
      if (this.state.uuid) {
        const channel = this.pusherConnection(this.state.uuid);
        console.log(channel);
      }
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
              <samp> Sample output </samp>
              <br />
              <br/>
              {/* Commands */}
              <button onClick ={() => this.handleClick("say")} className="submit-btn">
                  <p className="say-text"> Say</p>
              </button>
              <button onClick ={() => this.handleClick("move")}className="submit-btn">
                  <p className="move-text"> Move</p>
              </button>
              {/* Commands ^ */}
              <br/>
              {this.state.command_type === "move" ? <p>Enter your move  n or north to go north  s or south to go south w or west to go west and e or east to go east</p> : <p>Say something to the channel enter your message.</p>}
              <form onSubmit = {this.handleEnter}>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="additionalInput"
                  value={this.state.additionalInput}
                />
                <button className="submit-btn">
                  <p className = "enter-text"> Enter</p>
                </button>
              </form>
              <br />
              <br />
              <button onClick={this.signOut} className="submit-btn">
                <p className = "signout-text"> Sign Out</p>
              </button>
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
  
  export default Game;
  