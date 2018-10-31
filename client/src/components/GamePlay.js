//This file will allow a user if logged in to play the game, move around say things and receive messages back from other users.
//If the user is not logged in meaning they do not have a token set they will be redirected to the login page. 
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
// const Pusher = require('pusher');
import Pusher from "pusher-js";
const apiInit = "https://lambdamud-backend.herokuapp.com/api/adv/init/"; //get
const apiMove = "https://lambdamud-backend.herokuapp.com/api/adv/move/"; // post
const apiSay = "https://lambdamud-backend.herokuapp.com/api/adv/say"; // post
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
    uuid: "",
    channel: "",
    command_type : "move",
    reqOptions : {},
  };

  componentDidMount() {
    //upon mount the token is recieved from local storage 
    //The initialize route on the backend is peformed using the GET method
    //Receives players, description, title back and sets items onthe state. 
    const token = localStorage.getItem("jwt");
    const djangoToken = "Token " + token;
    const reqOptions = {
      headers: {
        Authorization: djangoToken,
        // "Content-Type": "application/json"
      }
    };
    this.setState({reqOptions})


    const promise = axios.get(apiInit, reqOptions);
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
        const pusher = new Pusher("f8d751864d185f0a3c5b", {
          cluster: "us2",
          forceTLS: true
        });
    
        const channel = pusher.subscribe(`p-channel-${uuid}`, uuid);
        channel.bind("broadcast", function(data) { //need to fill in data currently where does it come from?
          alert(JSON.stringify(data));
          this.setState({moves: [...this.state.moves, data]})
        });
        return channel;
      })

      .catch(error => {
        console.log(error.response);
      });
  }

  signOut = () => {
    //works with the sign out button once click it removes the token and pushes the user to the login path
    localStorage.removeItem("jwt");
    this.props.history.push("/login");
  };

  pusherConnection = uuid => {
    //connects to the Pusher by creating a instance and then subscribing and binding the broadcast event. 
    const pusher = new Pusher("f8d751864d185f0a3c5b", {
      cluster: "us2",
      forceTLS: true
    });

    const channel = pusher.subscribe(`p-channel-${uuid}`, uuid);
    channel.bind("broadcast", function(data) { //need to fill in data currently where does it come from?
      alert(JSON.stringify(data));
    });
    this.setState({channel})
    return channel;
  };

  handleChange = event => {
    //Handle change method allows for changing the input box for say and moves. 
    this.setState({ [event.target.name]: event.target.value });
  };
  handleEnter = event => {
      //relies on the handleClick method to be correct.  whatever the command_type is on the state 
      //it will perform a check on that command and use handleSay method or handleMove method
      //conditional test are made to choose which direction to send. 
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
    //   Will handle the movement takes the direction and then performs post request.
    this.setState({additionalInput: ""})
    const token = localStorage.getItem("jwt");
    const djangoToken = "Token " + token;
    const body = {"direction": direction}
    const promise = axios.post(apiMove, body, {"headers": {Authorization: djangoToken}})
    promise
    .then(response => {
        const moves = {title: response.data.title, description: response.data.description, players: response.data.players}
        console.log(response)
        this.setState({moves: [...this.state.moves, moves]})
    })
    .catch(error => {
        console.log(error.response)
    })
  }

  handleSay = (message) => {
    // Will handle say takes the messages and then provides it to every user. 
    this.setState({additionalInput: ""})
    const token = localStorage.getItem("jwt");
    const djangoToken = "Token " + token;
    const body = {"message": message}
    const promise = axios.post(apiSay, body, {"headers": {Authorization: djangoToken}})
    promise
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error.response)
    })
  }

  handleClick = command_type => {
    //takes the command type and then updates the state so that the form upon submit and be handled correctly.
    this.setState({command_type})
  }

  render() {
    console.log(this.state.moves);
    console.log(this.state)
    const moves = this.state.moves.slice()
    if (this.state.uuid) {
      const channel = this.state.channel;
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
            <button onClick ={() => this.handleClick("say")} className="web-btn">
                <span className="char2 title-first">S</span>
                <span className="char3 title-second">a</span>
                <span className="char4 title-third">y</span>
            </button>
            <button onClick ={() => this.handleClick("move")}className="web-btn">
                <span className="char2 title-first">M</span>
                <span className="char3 title-second">o</span>
                <span className="char4 title-third">v</span>
                <span className="char5 title-first">e</span>
            </button>
            {/* Commands ^ */}
            <br/>
            {this.state.command_type == "move" ? <p>Enter your move  n or north to go north  s or south to go south w or west to go west and e or east to go east</p> : <p>Say something to the channel enter your message.</p>}
            <form onSubmit = {this.handleEnter}>
              <input
                onChange={this.handleChange}
                type="text"
                name="additionalInput"
                value={this.state.additionalInput}
              />
              <button className="web-btn">
                <span className="char2 title-first">E</span>
                <span className="char3 title-second">n</span>
                <span className="char4 title-third">t</span>
                <span className="char5 title-first">e</span>
                <span className="char1 title-second">r</span>
              </button>
            </form>
            <br />
            <br />
            <button onClick={this.signOut} className="web-btn">
              <span className="char2 title-first">S</span>
              <span className="char3 title-second">i</span>
              <span className="char4 title-third">g</span>
              <span className="char5 title-first">n</span>
              <span className="char1 title-second">O</span>
              <span className="char2 title-third">u</span>
              <span className="char2 title-first">t</span>
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

export default GamePlay;
