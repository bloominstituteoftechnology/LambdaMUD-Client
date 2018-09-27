import React, { Component } from "react";
import "../App.css";
import Authenticate from "./Authenticate";
import axios from "axios";
import Pusher from 'pusher-js';

var pusher = new Pusher("a3d28056b6f3641f479a", { // instantiating pusher with PUSHER_APP_ID and cluster
    cluster: "us2",
    forceTLS: true
  });
  
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        name: "",
        uuid: "",
        title: "",
        error_msg: "",
        players: [],
      },
      room: {
        description: "",
      },
      message: "",
      messages: []
    };
  }

  componentDidMount() {
    axios
      .get("https://blakes-lambda-mud.herokuapp.com/api/adv/init", {
        headers: {
          Authorization: "Token " + localStorage.getItem("key")
        }
      })
      .then(response => {
        this.setState({ player: response.data });
        console.log(this.state)
        const channel = pusher.subscribe(`p-channel-${this.state.player.uuid}`);

        channel.bind("broadcast", function(data) {
            console.log("jsondata", JSON.stringify(data))
            console.log("responsedata", response.data)
          });
      });
       // subscribing to the channel
      

  }

  moveHandler = e => {
  
    axios
      .post(
        "https://blakes-lambda-mud.herokuapp.com/api/adv/move/",
        { direction: e.target.getAttribute("direction") }, // https://stackoverflow.com/questions/39670263/javascript-get-attributes-of-clicked-button
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("key"),
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        this.setState({ player: response.data });
      })
      .catch(err => console.log(err))
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sayHandler = e => {
    e.preventDefault();
    axios
      .post(
        "https://blakes-lambda-mud.herokuapp.com/api/adv/say/",
        { "message": this.state.message },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("key"),
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        console.log({ message: response.data.message });
        this.setState({message: ""})
        this.setState({
          messages: [...this.state.messages, response.data.message]
        })
      })
      .catch(err => console.log(err.response))
  };

  render() {
    return (
      <div>
        <h2>Welcome to your very own Lambda Adventure, {this.state.player.name}!</h2>
        <h3>Try to master: {this.state.player.title}</h3>
        <p>
          {this.state.player.description}
        </p>
        <h3>Try pair programming with:</h3>
        <ul>
          {this.state.player.players.map(player => {
            return <p key={Math.random()}>{this.state.player.name}</p>
          })}
        </ul>
        <p><b>Which way do you want to go?</b></p>
        <button direction="n" onClick={this.moveHandler}>
          &uarr;
        </button>
        <button direction="s" onClick={this.moveHandler}>
        &darr; 
        </button>
        <button direction="w" onClick={this.moveHandler}>
        &larr; 
        </button>
        <button direction="e" onClick={this.moveHandler}>
        &rarr;
        </button>
        <p style={{ color: "red" }}>
          <i>{this.state.player.error_msg}</i>
        </p>
        <div>"{this.state.messages}" - {this.state.player.name}</div>
        <p><b>What do you want to say?</b></p>
        <form onSubmit={this.sayHandler}>
        <input 
            type="text"
            placeholder="Enter a message..."
            name="message" 
            value={this.state.message}
            onChange={this.inputHandler} />
        <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Authenticate(Game);
